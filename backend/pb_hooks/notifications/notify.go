package notifications

import (
	"encoding/json"
	"os"
	"pocketbase/pb_hooks/db"

	"github.com/SherClockHolmes/webpush-go"
	"github.com/pocketbase/pocketbase"
)

type NotificationMethod int

const (
	None NotificationMethod = iota
	WebPush
)

func Notify(app *pocketbase.PocketBase, method NotificationMethod, userIds []string, data any) (int, error) {
	switch method {
	case None:
		return 0, nil
	case WebPush:
		return notifyWithWebPush(app, userIds, data)
	default:
		app.Logger().Error("[Notify] unknown method given", "method", method)
	}
	return 0, nil
}

func notifyWithWebPush(app *pocketbase.PocketBase, userIds []string, data any) (int, error) {

	app.Logger().Debug("[notifyWithWebPush] test notifications of users", "users", userIds)

	if len(userIds) == 0 {
		return 0, nil
	}

	notificationBody, err := json.Marshal(data)
	if err != nil {
		app.Logger().Error("[notifyWithWebPush] cannot marshall notification data", "error", err)
		return 0, err
	}

	subscriptions, err := db.FindSubscriptionsByUserIds(app, userIds)
	if err != nil {
		app.Logger().Error("[notifyWithWebPush] cannot subscriptions for users", "users", userIds)
		return 0, err
	}

	app.Logger().Debug("[notifyWithWebPush] found subscriptions", "subscriptions", len(subscriptions))

	for _, row := range subscriptions {
		s := &webpush.Subscription{}
		err := json.Unmarshal([]byte(row), s)
		if err != nil {
			app.Logger().Warn("[notifyWithWebPush] cannot use subscription", "subscription", row)
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
			app.Logger().Debug("[notifyWithWebPush] error using subscription", "subscription", row, "error", err)
			continue
		}
		defer resp.Body.Close()
	}

	return len(subscriptions), nil
}
