package services

import (
	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/core"
)

func BindPostChoreCompletionHook(app *pocketbase.PocketBase) {

	app.OnRecordAfterUpdateSuccess("chores").BindFunc(func(e *core.RecordEvent) error {
		updated := e.Record.GetDateTime("last_completed").Unix()
		current := e.Record.Original().GetDateTime("last_completed").Unix()

		// when it has just been completed
		if updated > current {
			app.Logger().Info("[completed-chore] we should notify the admins", "chore", e.Record.Id)

			count, err := NotifyCompletedChoreToAdminUsers(app, e.Record.Id)
			if err != nil {
				app.Logger().Info("[completed-chore] error while notifying the admins", "error", err)
			}

			app.Logger().Info("[completed-chore] notified admins", "count", count)
		}

		return e.Next()
	})
}
