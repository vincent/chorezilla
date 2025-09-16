package jobs

import (
	"log"

	"github.com/pocketbase/pocketbase"
)

func RegisterChoresNotificationsJob(app pocketbase.PocketBase) {

	app.Cron().MustAdd("hello", "*/2 * * * *", func() {
		log.Println("Hello!")
	})
}
