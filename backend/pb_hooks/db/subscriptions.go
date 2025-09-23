package db

import (
	"github.com/pocketbase/dbx"
	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/core"
)

// AnswerInput represents the input for a single answer.
type AnswerInput struct {
	Id    string
	Value interface{}
}

// AddSubscription records a push notificatioons subscription
func AddSubscription(app *pocketbase.PocketBase, userId string, subscription string) (*core.Record, error) {
	collection, err := app.FindCollectionByNameOrId("subscriptions")
	if err != nil {
		return nil, err
	}

	var record = core.NewRecord(collection)
	record.Set("user", userId)
	record.Set("subscription", subscription)

	err = app.Save(record)
	if err != nil {
		app.Logger().Error("[AddSubscription] cannot insert subscription", "error", err)
		return nil, err
	}
	app.Logger().Debug("[AddSubscription] insert subscription", "id", record.Id)

	return record, nil
}

func FindSubscriptionsByUserId(app *pocketbase.PocketBase, userId string) ([]string, error) {
	subscriptions := []string{}

	s, err := app.FindRecordsByFilter(
		"user_subscriptions",
		"user = {:user}",
		"created",
		5,
		0,
		dbx.Params{"user": userId},
	)
	if err != nil {
		app.Logger().Error("[FindSubscriptionByUserId] cannot subscriptions for user", "user", userId)
		return subscriptions, err
	}

	for _, r := range s {
		app.Logger().Debug("[FindSubscriptionByUserId] found subscription for user", "user", userId)
		subscriptions = append(subscriptions, r.GetString("subscription"))
	}

	return subscriptions, nil
}

func FindSubscriptionsByUserIds(app *pocketbase.PocketBase, userIds []string) ([]string, error) {
	subscriptions := []string{}

	for _, uid := range userIds {
		usubs, err := FindSubscriptionsByUserId(app, uid)
		if err == nil {
			for _, s := range usubs {
				subscriptions = append(subscriptions, s)
			}
		}
	}

	return subscriptions, nil
}
