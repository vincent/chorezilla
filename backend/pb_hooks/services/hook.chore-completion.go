package services

import (
	"pocketbase/pb_hooks/notifications"

	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/core"
)

func BindPostChoreCompletionHook(app *pocketbase.PocketBase) {

	app.OnRecordAfterUpdateSuccess("chores").BindFunc(func(e *core.RecordEvent) error {
		updated := e.Record.GetDateTime("last_completed").Unix()
		current := e.Record.Original().GetDateTime("last_completed").Unix()

		// when it has just been completed
		if updated > current {
			app.Logger().Debug("[PostChoreCompletionHook] we should notify the admins", "chore", e.Record.Id)

			count, err := notifications.NotifyCompletedChoreToAdminUsers(app, e.Record.Id)
			if err != nil {
				app.Logger().Error("[PostChoreCompletionHook] error while notifying the admins", "error", err)
				return e.Next()
			}

			app.Logger().Debug("[PostChoreCompletionHook] notified admins", "count", count)
		}

		return e.Next()
	})
}
