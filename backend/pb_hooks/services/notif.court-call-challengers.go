package services

import (
	"encoding/json"
	"os"

	webpush "github.com/SherClockHolmes/webpush-go"
	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/core"
)

func notificationCourtCallChallengers(app *pocketbase.PocketBase, callerId string, courtId string) error {
	var record *core.Record

	record, err := app.FindRecordById("courts", courtId)
	if err != nil {
		return err
	}

	app.Logger().Info("[subscriptions] insert subscription", "id", record.Id)

	// Decode subscription
	s := &webpush.Subscription{}
	json.Unmarshal([]byte("<YOUR_SUBSCRIPTION>"), s)

	// Send Notification
	resp, err := webpush.SendNotification([]byte("Test"), s, &webpush.Options{
		Subscriber:      "example@example.com",
		VAPIDPublicKey:  os.Getenv("JUGAMOS_VAPID_PUBLIC_KEY"),
		VAPIDPrivateKey: os.Getenv("JUGAMOS_VAPID_PRIVATE_KEY"),
		TTL:             30,
	})
	if err != nil {
		// TODO: Handle error
	}
	defer resp.Body.Close()

	return nil
}
