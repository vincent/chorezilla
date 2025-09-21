package services

import (
	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/core"
)

func BindAfterHouseholdMemberCreateSuccessHook(app *pocketbase.PocketBase) {

	app.OnRecordAfterCreateSuccess("household_members").BindFunc(func(e *core.RecordEvent) error {
		householdId := e.Record.GetString("household")
		userId := e.Record.GetString("user")

		user, err := app.FindRecordById("users", userId)
		if err != nil || user == nil {
			e.App.Logger().Error("[BindAfterHouseholdMemberCreateSuccessHook] cannot find the user", "error", err)
			return err
		}

		user.Set("households", append(user.GetStringSlice("households"), householdId))

		err = e.App.Save(user)
		if err != nil {
			e.App.Logger().Error("[BindAfterHouseholdMemberCreateSuccessHook] cannot update the user", "error", err)
			return err
		}

		e.App.Logger().Info("[BindAfterHouseholdMemberCreateSuccessHook] attached household to user", "user", user.Id, "household", householdId)

		return nil
	})
}
