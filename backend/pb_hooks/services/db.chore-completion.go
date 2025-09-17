package services

import (
	"time"

	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/core"
)

func BindPostChoreCompletionHook(app *pocketbase.PocketBase) {

	app.OnRecordAfterUpdateSuccess("chores").BindFunc(func(e *core.RecordEvent) error {
		updated := e.Record.GetDateTime("updated").Time()

		if updated.Unix() > (time.Now().Unix() - 5) {
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
