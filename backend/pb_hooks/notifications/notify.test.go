package notifications

import (
	"github.com/pocketbase/pocketbase"
)

func NotifyTest(app *pocketbase.PocketBase, userIds []string) (int, error) {
	return Notify(app, WebPush, userIds, &map[string]string{
		"Type": "test",
	})
}
