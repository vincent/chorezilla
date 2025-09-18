package services

import (
	"encoding/json"
	"os"
	"time"

	"github.com/SherClockHolmes/webpush-go"
	"github.com/pocketbase/dbx"
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

	subscriptions := []string{}
	assigned := chore.GetStringSlice("assigned_users")

	app.Logger().Info("[challenge] found assigned users", "assigned", len(assigned))

	if len(assigned) > 0 {
		for _, uid := range assigned {
			s, err := app.FindRecordsByFilter(
				"user_subscriptions",
				"user = {:user}",
				"created",
				5,
				0,
				dbx.Params{"user": uid},
			)
			if err == nil {
				for _, r := range s {
					app.Logger().Info("[challenge] found subscription for chore", "chore", chore.Id)
					subscriptions = append(subscriptions, r.GetString("subscription"))
				}
			}
		}

		app.Logger().Info("[challenge] call assigned users for chore", "subscriptions", len(subscriptions), "chore", chore.Id)

		notification := &DueChoreNotification{
			Type:         "due-chore",
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
				app.Logger().Warn("[challenge] cannot use subscription", "subscription", row)
				continue
			}

			// Send Notification
			resp, err := webpush.SendNotification([]byte(notificationBody), s, &webpush.Options{
				Topic:           "due-chore-" + chore.Id,
				Subscriber:      "example@example.com",
				VAPIDPublicKey:  os.Getenv("CHOREZILLA_VAPID_PUBLIC_KEY"),
				VAPIDPrivateKey: os.Getenv("CHOREZILLA_VAPID_PRIVATE_KEY"),
				TTL:             30,
			})
			if err != nil {
				app.Logger().Info("[challenge] error using subscription", "subscription", row, "error", err)
			}
			defer resp.Body.Close()
		}
	}

	chore.Set("last_notified_push", time.Now().UTC())
	err = app.Save(chore)
	if err != nil {
		app.Logger().Info("[challenge] error updating chore", "error", err)
	}

	return len(subscriptions), nil
}
