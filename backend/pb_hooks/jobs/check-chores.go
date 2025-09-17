package jobs

import (
	"pocketbase/pb_hooks/services"

	"github.com/pocketbase/pocketbase"
)

func RegisterChoresNotificationsJob(app *pocketbase.PocketBase) {

	app.Cron().MustAdd("NotifyDueChoresToAssignedUsers", "*/10 * * * *", func() {
		chores, err := services.FindDueChoresToNotify(app)

		if err != nil {
			app.Logger().Error("[new-user] cannot find due chores", "error", err)
			return
		}

		for _, rec := range chores {
			app.Logger().Info("[chores-job] chore is due", "id", rec.Id, "name", rec.Name, "assigned", rec.AssignedUsers)

			count, err := services.NotifyDueChoreToAssignedUsers(app, rec.Id)

			if err != nil {
				app.Logger().Error("[chores-job] cannot send notifications", "error", err)
				continue
			}

			app.Logger().Info("[chores-job] sent notifications", "count", count)
		}
	})
}
