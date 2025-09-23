package db

import (
	"github.com/pocketbase/dbx"
	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/core"
)

func FindInvitationForHousehold(app *pocketbase.PocketBase, householdId string, email string) (*core.Record, error) {

	invitations, err := app.FindRecordsByFilter(
		"invitations",
		"household = {:household} && email = {:email}",
		"created",
		1,
		0,
		dbx.Params{
			"household": householdId,
			"email":     email,
		},
	)
	if err != nil || len(invitations) != 1 {
		return nil, err
	}

	return invitations[0], nil
}

func CreateInvitationForHousehold(app *pocketbase.PocketBase, householdId string, email string, name string, role string) (*core.Record, error) {
	collection, err := app.FindCollectionByNameOrId("invitations")
	if err != nil {
		return nil, err
	}

	var record = core.NewRecord(collection)
	record.Set("household", householdId)
	record.Set("status", "pending")
	record.Set("email", email)
	record.Set("name", name)
	record.Set("role", role)

	err = app.Save(record)
	if err != nil {
		app.Logger().Error("[CreateInvitationForHousehold] cannot insert", "error", err)
		return nil, err
	}

	return record, nil
}

func UpsertInvitationForHousehold(app *pocketbase.PocketBase, householdId string, email string, name string, role string) (*core.Record, error) {
	record, err := FindInvitationForHousehold(app, householdId, email)
	if record == nil {
		record, err = CreateInvitationForHousehold(app, householdId, email, name, role)
		if err != nil {
			app.Logger().Error("[UpsertInvitationForHousehold] cannot insert", "error", err)
			return nil, err
		}
	}
	return record, err
}
