package db

import (
	"time"

	"github.com/pocketbase/dbx"
	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/tools/types"
)

type Chore struct {
	Id            string                  `db:"id" json:"id"`
	Name          string                  `db:"name" json:"name"`
	Household     string                  `db:"household" json:"household"`
	AssignedUsers types.JSONArray[string] `db:"assigned_users" json:"assigned_users"`
}

func FindDueChoresToNotify(app *pocketbase.PocketBase) ([]Chore, error) {

	chores := []Chore{}

	now := time.Now().UTC()
	yearly := now.AddDate(-1, 0, 0).Format("2006-01-02 15:04:05.000Z")
	monthly := now.AddDate(0, -1, 0).Format("2006-01-02 15:04:05.000Z")
	weekly := now.AddDate(0, 0, -7).Format("2006-01-02 15:04:05.000Z")
	daily := now.AddDate(0, 0, -1).Format("2006-01-02 15:04:05.000Z")
	hourly := now.Add(-1 * time.Hour).Format("2006-01-02 15:04:05.000Z")

	err := app.DB().
		NewQuery(`
			SELECT id, name, household, assigned_users
			  FROM chores
			 WHERE 1=1
			 	AND (starts_at = NULL
					OR starts_at < DATE()
				)
			 	AND (last_notified_push = NULL
					OR last_notified_push < {:daily}
				)
			 	AND (last_notified_push = null 
					OR last_notified_push < CASE frequency
						WHEN 'yearly'  THEN {:monthly}
						WHEN 'monthly' THEN {:weekly}
						WHEN 'weekly'  THEN {:daily}
						WHEN 'daily'   THEN {:hourly}
						WHEN 'hourly'  THEN {:hourly}
						ELSE last_completed END
				)
				AND (last_completed = null 
					OR last_completed < CASE frequency
						WHEN 'yearly'  THEN {:yearly}
						WHEN 'monthly' THEN {:monthly}
						WHEN 'weekly'  THEN {:weekly}
						WHEN 'daily'   THEN {:daily}
						WHEN 'hourly'  THEN {:hourly}
						ELSE last_completed END
				)
		`).
		Bind(dbx.Params{
			"yearly":  yearly,
			"monthly": monthly,
			"weekly":  weekly,
			"daily":   daily,
			"hourly":  hourly,
			"to":      now.Format("2006-01-02 15:04:05.000Z"),
		}).
		All(&chores)

	if err != nil {
		app.Logger().Error("[FindDueChoresToNotify] cannot find due chores", "error", err)
		return nil, err
	}

	return chores, nil
}
