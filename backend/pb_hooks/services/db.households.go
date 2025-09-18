package services

import (
	"errors"

	"github.com/pocketbase/dbx"
	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/core"
)

func stringInSlice(a string, list []string) bool {
	for _, b := range list {
		if b == a {
			return true
		}
	}
	return false
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
