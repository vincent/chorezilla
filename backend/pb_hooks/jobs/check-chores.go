package jobs

import (
	"pocketbase/pb_hooks/db"
	"pocketbase/pb_hooks/notifications"

	"github.com/pocketbase/pocketbase"
)

func RegisterChoresNotificationsJob(app *pocketbase.PocketBase) {

	app.Cron().MustAdd("NotifyDueChoresToAssignedUsers", "*/10 * * * *", func() {
		chores, err := db.FindDueChoresToNotify(app)

		if err != nil {
			app.Logger().Error("[NotifyDueChoresToAssignedUsers] cannot find due chores", "error", err)
			return
		}

		if len(chores) == 0 {
			app.Logger().Debug("[NotifyDueChoresToAssignedUsers] no due chores")
			return
		}

		for _, rec := range chores {
			app.Logger().Debug("[NotifyDueChoresToAssignedUsers] chore is due", "id", rec.Id, "name", rec.Name, "assigned", rec.AssignedUsers)

			count, err := notifications.NotifyDueChoreToAssignedUsers(app, rec.Id)

			if err != nil {
				app.Logger().Error("[NotifyDueChoresToAssignedUsers] cannot send notifications", "error", err)
				continue
			}

			app.Logger().Debug("[NotifyDueChoresToAssignedUsers] sent notifications", "count", count)
		}
	})
}
