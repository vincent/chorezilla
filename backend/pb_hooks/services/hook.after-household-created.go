package services

import (
	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/core"
)

func BindAfterHouseholdCreateSuccessHook(app *pocketbase.PocketBase) {

	app.OnRecordAfterCreateSuccess("households").BindFunc(func(e *core.RecordEvent) error {
		householdId := e.Record.Id
		userId := e.Record.GetString("created_by")

		_, err := AddHouseholdMember(e.App, householdId, userId, "admin")

		// will trigger BindAfterHouseholdMemberCreateSuccessHook

		e.App.Logger().Info("[BindAfterHouseholdCreateSuccessHook] created membership upon household creation", "household", householdId)

		return err
	})
}
