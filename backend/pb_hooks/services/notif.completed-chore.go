package services

import (
	"encoding/json"
	"os"

	"github.com/SherClockHolmes/webpush-go"
	"github.com/pocketbase/dbx"
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

	admins, err := app.FindRecordsByFilter(
		"household_members",
		"household = {:household} && user != {:completer} && role = {:role}",
		"created",
		5,
		0,
		dbx.Params{
			"household": household.Id,
			"completer": chore.GetString("last_completed_by"),
			"role":      "admin",
		},
	)
	if err != nil {
		return 0, err
	}

	app.Logger().Info("[completed-chores-job] found admins", "admins", len(admins))

	subscriptions := []string{}

	if len(admins) > 0 {
		for _, u := range admins {
			s, err := app.FindRecordsByFilter(
				"user_subscriptions",
				"user = {:user}",
				"created",
				5,
				0,
				dbx.Params{"user": u.GetString("user")},
			)
			if err == nil {
				for _, r := range s {
					app.Logger().Info("[completed-chores-job] found subscription for chore", "chore", chore.Id)
					subscriptions = append(subscriptions, r.GetString("subscription"))
				}
			}
		}

		app.Logger().Info("[completed-chores-job] call admin users for chore", "subscriptions", len(subscriptions), "chore", chore.Id)

		notification := &CompletedChoreNotification{
			Type:         "completed-chore",
			Household:    household.GetString("name"),
			LocationName: room.GetString("name"),
			ChoreName:    chore.GetString("name"),
			ChoreID:      chore.Id,
		}
		notificationBody, _ := json.Marshal(notification)

		for _, row := range subscriptions {
			s := &webpush.Subscription{}
			err := json.Unmarshal([]byte(row), s)
			if err != nil {
				app.Logger().Warn("[completed-chores-job] cannot use subscription", "subscription", row)
				continue
			}

			// Send Notification
			resp, err := webpush.SendNotification([]byte(notificationBody), s, &webpush.Options{
				Topic:           "completed-chore-" + chore.Id,
				Subscriber:      "example@example.com",
				VAPIDPublicKey:  os.Getenv("CHOREZILLA_VAPID_PUBLIC_KEY"),
				VAPIDPrivateKey: os.Getenv("CHOREZILLA_VAPID_PRIVATE_KEY"),
				TTL:             30,
			})
			if err != nil {
				app.Logger().Info("[completed-chores-job] error using subscription", "subscription", row, "error", err)
			}
			defer resp.Body.Close()
		}
	}

	return len(subscriptions), nil
}
