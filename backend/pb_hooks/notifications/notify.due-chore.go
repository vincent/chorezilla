package notifications

import (
	"time"

	"github.com/pocketbase/pocketbase"
)

type DueChoreNotification struct {
	Type         string `json:"type"`
	Household    string `json:"household"`
	LocationName string `json:"location"`
	ChoreName    string `json:"chore_name"`
	ChoreID      string `json:"chore_id"`
}

func NotifyDueChoreToAssignedUsers(app *pocketbase.PocketBase, choreId string) (int, error) {

	chore, err := app.FindRecordById("chores", choreId)
	if err != nil {
		return 0, err
	}

	household, err := app.FindRecordById("households", chore.GetString("household"))
	if err != nil {
		return 0, err
	}

	room, err := app.FindRecordById("rooms", chore.GetString("room"))
	if err != nil {
		return 0, err
	}

	assigned := chore.GetStringSlice("assigned_users")

	app.Logger().Debug("[NotifyDueChoreToAssignedUsers] found assigned users", "assigned", len(assigned))

	count, err := Notify(app, WebPush, assigned, &DueChoreNotification{
		Type:         "due-chore",
		Household:    household.GetString("name"),
		LocationName: room.GetString("name"),
		ChoreName:    chore.GetString("name"),
		ChoreID:      chore.Id,
	})
	if err != nil {
		app.Logger().Error("[NotifyDueChoreToAssignedUsers] error notifying assigned users", "error", err)
	}

	app.Logger().Debug("[NotifyDueChoreToAssignedUsers] notified assigned users for chore", "count", count, "chore", chore.Id)

	chore.Set("last_notified_push", time.Now().UTC())
	err = app.Save(chore)
	if err != nil {
		app.Logger().Error("[NotifyDueChoreToAssignedUsers] error updating chore", "error", err)
	}

	return count, nil
}
