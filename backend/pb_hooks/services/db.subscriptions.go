package services

import (
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
		app.Logger().Error("[subscriptions] cannot insert subscription", "error", err)
		return nil, err
	}
	app.Logger().Info("[subscriptions] insert subscription", "id", record.Id)

	return record, nil
}

// SetCourtChallenger records a user as challenger
func SetCourtChallenger(app *pocketbase.PocketBase, userId string, courtId string, enabled bool) error {
	collection, err := app.FindCollectionByNameOrId("court_challengers")
	if err != nil {
		return err
	}

	if enabled {
		var record = core.NewRecord(collection)
		record.Set("user", userId)
		record.Set("court", courtId)

		err = app.Save(record)
		if err != nil {
			app.Logger().Error("[subscriptions] cannot insert court_challenger", "error", err)
			return err
		}
		app.Logger().Info("[subscriptions] insert court_challenger", "id", record.Id)
	}

	if !enabled {
		records, err := app.FindRecordsByFilter(
			collection,
			"user = {:userId}",
			"",   // no sort
			1,    // page
			1000, // perPage (adjust as needed)
			map[string]any{"userId": userId},
		)

		if err != nil {
			app.Logger().Error("[subscriptions] cannot list court_challenger", "error", err)
			return err
		}

		for _, rec := range records {
			app.Logger().Info("[subscriptions] delete challenger", "id", rec.Id)
			if err := app.Delete(rec); err != nil {
				//
			}
		}

		app.Logger().Info("[subscriptions] delete all court_challenger for user", "id", userId)
	}

	return nil
}
