package services

import (
	"encoding/json"
	"os"

	"github.com/SherClockHolmes/webpush-go"
	"github.com/pocketbase/dbx"
	"github.com/pocketbase/pocketbase"
)

type CallPushNotification struct {
	Caller       string `json:"caller"`
	Sport        string `json:"sport"`
	LocationName string `json:"location"`
	CourtName    string `json:"court"`
	MatchID      string `json:"matchId"`
}

func CallMatchChallengers(app *pocketbase.PocketBase, callerId string, matchId string) (error, int) {

	caller, err := app.FindRecordById("users", callerId)
	if err != nil {
		return err, 0
	}

	match, err := app.FindRecordById("matches", matchId)
	if err != nil {
		return err, 0
	}

	challengers, err := app.FindAllRecords("court_challengers",
		dbx.NewExp("court = {:court} AND user != {:user}",
			dbx.Params{"court": match.GetString("court"), "user": caller.Id}),
	)
	if err != nil {
		app.Logger().Info("[challenge] cannot find challengers", "err", err)
		return err, 0
	}

	app.Logger().Info("[challenge] found challengers", "challengers", len(challengers))

	subscriptions := []string{}

	if len(challengers) > 0 {
		for _, row := range challengers {
			s, err := app.FindRecordsByFilter(
				"user_subscriptions",
				"user = {:user}",
				"created",
				1,
				0,
				dbx.Params{"user": row.GetString("user")},
			)
			if err == nil {
				app.Logger().Info("[challenge] found challenger subscription for match", "id", match.Id)
				subscriptions = append(subscriptions, s[0].GetString("subscription"))
			}
		}

		app.Logger().Info("[challenge] call challengers for match", "subscriptions", len(subscriptions), "id", match.Id)

		notification := &CallPushNotification{
			CourtName: "CourtName",
			Caller:    caller.GetString("name"),
			MatchID:   match.Id,
			Sport:     "tennis",
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
				Subscriber:      "example@example.com",
				VAPIDPublicKey:  os.Getenv("CHORES_VAPID_PUBLIC_KEY"),
				VAPIDPrivateKey: os.Getenv("CHORES_VAPID_PRIVATE_KEY"),
				TTL:             30,
			})
			if err != nil {
				app.Logger().Info("[challenge] error using subscription", "subscription", row, "error", err)
			}
			defer resp.Body.Close()
		}
	}

	return nil, len(subscriptions)
}
