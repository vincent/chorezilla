package services

import (
	"errors"

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

func FindOwnedHouseholdById(app *pocketbase.PocketBase, memberId string, householdId string) (*core.Record, error) {

	user, err := app.FindRecordById("users", memberId)
	if err != nil {
		return nil, err
	}

	if !stringInSlice(householdId, user.GetStringSlice("households")) {
		return nil, errors.New("not a member of this household")
	}

	household, err := app.FindRecordById("households", householdId)
	if err != nil {
		return nil, err
	}

	return household, nil
}
