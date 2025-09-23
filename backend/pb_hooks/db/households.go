package db

import (
	"errors"

	"github.com/pocketbase/dbx"
	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/core"
)

func CreateHousehold(app core.App, createdBy string) (*core.Record, error) {

	households, err := app.FindCollectionByNameOrId("households")
	if err != nil {
		app.Logger().Error("[CreateHousehold] cannot find collection", "error", err)
		return nil, err
	}

	household := core.NewRecord(households)
	household.Set("created_by", createdBy)
	household.Set("name", "Home")

	if err := app.Save(household); err != nil {
		app.Logger().Error("[CreateHousehold] cannot create household", "error", err)
		return nil, err
	}

	return household, nil
}

func CreateRoom(app core.App, householdId string) (*core.Record, error) {

	rooms, err := app.FindCollectionByNameOrId("rooms")
	if err != nil {
		app.Logger().Error("[CreateRoom] cannot find collection", "error", err)
		return nil, err
	}

	room := core.NewRecord(rooms)
	room.Set("name", "Main room")
	room.Set("location", "Home")
	room.Set("description", "Your first room")
	room.Set("color", "indigo")
	room.Set("household", householdId)

	return room, nil
}

func AddHouseholdMember(app core.App, householdId string, userId string, role string) (*core.Record, error) {
	// create household_members row
	householdMembers, err := app.FindCollectionByNameOrId("household_members")
	if err != nil {
		app.Logger().Error("[AddHouseholdMember] cannot find collection", "error", err)
		return nil, err
	}

	member := core.NewRecord(householdMembers)
	member.Set("household", householdId)
	member.Set("user", userId)
	member.Set("role", role)

	err = app.Save(member)
	if err != nil {
		app.Logger().Error("[AddHouseholdMember] cannot insert household member", "error", err)
		return nil, err
	}

	user, err := app.FindRecordById("users", userId)
	if err != nil || user == nil {
		app.Logger().Error("[AddHouseholdMember] cannot find the user", "error", err)
		return nil, err
	}

	user.Set("households", append(user.GetStringSlice("households"), householdId))

	err = app.Save(user)
	if err != nil {
		app.Logger().Error("[AddHouseholdMember] cannot update the user", "error", err)
		return nil, err
	}

	app.Logger().Debug("[AddHouseholdMember] added member to household", "user", user.Id, "household", householdId)

	return member, nil
}

func FindOwnedHouseholdAdminByUserId(app *pocketbase.PocketBase, userId string, householdId string) (*core.Record, error) {

	user, err := app.FindRecordById("users", userId)
	if err != nil || !stringInSlice(householdId, user.GetStringSlice("households")) {
		return nil, errors.New("not a member of this household")
	}

	admins, err := app.FindRecordsByFilter(
		"household_members",
		"household = {:household} && user = {:user} && role = {:role}",
		"created",
		1,
		0,
		dbx.Params{
			"household": householdId,
			"user":      userId,
			"role":      "admin",
		},
	)
	if err != nil || len(admins) != 1 {
		return nil, err
	}

	household, err := app.FindRecordById("households", householdId)
	if err != nil {
		return nil, err
	}

	return household, nil
}

func FindHouseholdAdmins(app *pocketbase.PocketBase, householdId string) ([]*core.Record, error) {
	return app.FindRecordsByFilter(
		"household_members",
		"household = {:household} && user = {:user} && role = {:role}",
		"created",
		1,
		0,
		dbx.Params{
			"household": householdId,
			"role":      "admin",
		},
	)
}

func FindOwnedHouseholdMemberByUserId(app *pocketbase.PocketBase, userId string, householdId string) (*core.Record, error) {

	user, err := app.FindRecordById("users", userId)
	if err != nil || !stringInSlice(householdId, user.GetStringSlice("households")) {
		return nil, errors.New("not a member of this household")
	}

	admins, err := app.FindRecordsByFilter(
		"household_members",
		"household = {:household} && user = {:user}",
		"created",
		1,
		0,
		dbx.Params{
			"household": householdId,
			"user":      userId,
		},
	)
	if err != nil || len(admins) != 1 {
		return nil, err
	}

	household, err := app.FindRecordById("households", householdId)
	if err != nil {
		return nil, err
	}

	return household, nil
}

func stringInSlice(a string, list []string) bool {
	for _, b := range list {
		if b == a {
			return true
		}
	}
	return false
}
