package notifications

import (
	"pocketbase/pb_hooks/db"

	"github.com/pocketbase/pocketbase"
)

type CompletedChoreNotification struct {
	Type         string `json:"type"`
	Household    string `json:"household"`
	LocationName string `json:"location"`
	ChoreName    string `json:"chore_name"`
	ChoreID      string `json:"chore_id"`
}

func NotifyCompletedChoreToAdminUsers(app *pocketbase.PocketBase, choreId string) (int, error) {

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

	userIds := []string{}
	admins, err := db.FindHouseholdAdmins(app, household.Id)
	if err != nil {
		return 0, err
	}
	for _, a := range admins {
		if a.GetString("user") != chore.GetString("last_completed_by") {
			userIds = append(userIds, a.GetString("user"))
		}
	}

	app.Logger().Debug("[NotifyCompletedChoreToAdminUsers] found admins", "admins", len(admins))

	return Notify(app, WebPush, userIds, &CompletedChoreNotification{
		Type:         "completed-chore",
		Household:    household.GetString("name"),
		LocationName: room.GetString("name"),
		ChoreName:    chore.GetString("name"),
		ChoreID:      chore.Id,
	})
}
