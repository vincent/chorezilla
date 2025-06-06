package services

import (
	"errors"
	"time"

	"github.com/pocketbase/dbx"
	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/core"
)

func PrepareMatch(app *pocketbase.PocketBase, userId string, courtId string) (*core.Record, error) {
	collection, err := app.FindCollectionByNameOrId("matches")
	if err != nil {
		return nil, err
	}

	court, err := app.FindRecordById("courts", courtId)
	if err != nil {
		app.Logger().Error("[matchs] no such court", "error", err)
		return nil, err
	}

	currents, err := app.FindRecordsByFilter(
		"matches",
		"court ~ {:court} && status != 'finished' && status != 'cancelled'",
		"-created",
		10,
		0,
		dbx.Params{"court": court.Id},
	)
	if err != nil {
		app.Logger().Error("[matchs] cannot list current matchs on court", "error", err)
		return nil, err
	}
	if len(currents) > 0 {
		err = errors.New("there are already in-progress matchs on this court")
		app.Logger().Error("[matchs] cannot prepare match on court", "reason", err)
		return nil, err
	}

	var record = core.NewRecord(collection)
	record.Set("status", "lobby")
	record.Set("creator", userId)
	record.Set("court", court.Id)
	record.Set("max_players", 10)
	record.Set("scheduled_start_time", time.Now().Add(5*time.Minute).Format(time.RFC3339))
	record.Set("sport_type", court.FieldsData()["sport_type"])

	err = app.Save(record)
	if err != nil {
		app.Logger().Error("[matchs] cannot insert match", "error", err)
		return nil, err
	}
	app.Logger().Info("[matchs] insert match", "id", record.Id)

	return record, nil
}

func StartMatch(app *pocketbase.PocketBase, userId string, matchId string) (*core.Record, error) {
	record, err := app.FindRecordById("matches", matchId)
	if err != nil {
		app.Logger().Error("[matchs] no such match", "error", err)
		return nil, err
	}
	if record.GetString("creator") != userId {
		err = errors.New("only the creator can start the match")
		app.Logger().Error("[matchs] cannot start match", "error", err)
		return nil, err
	}

	record.Set("status", "playing")
	record.Set("actual_start_time", "todo: current datetime in ISO format")

	err = app.Save(record)
	if err != nil {
		app.Logger().Error("[matchs] cannot update match", "error", err)
		return nil, err
	}
	app.Logger().Info("[matchs] update match", "id", record.Id)

	return record, nil
}
