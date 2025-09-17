package services

import (
	"encoding/json"
	"os"

	"github.com/SherClockHolmes/webpush-go"
	"github.com/pocketbase/dbx"
	"github.com/pocketbase/pocketbase"
)

func NotifyTest(app *pocketbase.PocketBase, userIds []string) (int, error) {

	subscriptions := []string{}

	app.Logger().Info("[challenge] found assigned users", "assigned", len(userIds))

	if len(userIds) > 0 {
		for _, uid := range userIds {
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
					app.Logger().Info("[test-notification] found subscription for user", "chore", uid)
					subscriptions = append(subscriptions, r.GetString("subscription"))
				}
			}
		}

		app.Logger().Info("[test-notification] call users for test", "subscriptions", len(subscriptions))

		notification := &DueChoreNotification{
			Type: "test",
		}
		notificationBody, _ := json.Marshal(notification)

		for _, row := range subscriptions {
			s := &webpush.Subscription{}
			err := json.Unmarshal([]byte(row), s)
			if err != nil {
				app.Logger().Warn("[test-notification] cannot use subscription", "subscription", row)
				continue
			}

			// Send Notification
			resp, err := webpush.SendNotification([]byte(notificationBody), s, &webpush.Options{
				Subscriber:      "example@example.com",
				VAPIDPublicKey:  os.Getenv("CHOREZILLA_VAPID_PUBLIC_KEY"),
				VAPIDPrivateKey: os.Getenv("CHOREZILLA_VAPID_PRIVATE_KEY"),
				TTL:             30,
			})
			if err != nil {
				app.Logger().Info("[test-notification] error using subscription", "subscription", row, "error", err)
			}
			defer resp.Body.Close()
		}
	}

	return len(subscriptions), nil
}
