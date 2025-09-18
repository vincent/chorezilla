// Package pb_routes provides custom route handlers for the application.
package pb_routes

import (
	"net/http"
	"pocketbase/pb_hooks/services"

	"github.com/pocketbase/dbx"
	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/core"
)

// testNotificationRequest represents the expected request body.
type testNotificationRequest struct {
	Household string `json:"household"`
	Scope     string `json:"scope"`
}

// RegisterTestNotificationRoute registers the /api/test-notification POST route.
func RegisterTestNotificationRoute(app *pocketbase.PocketBase) {
	app.OnServe().BindFunc(func(se *core.ServeEvent) error {
		se.Router.POST("/api/test-notification", func(e *core.RequestEvent) error {

			// Parse request body
			var form testNotificationRequest
			if err := e.BindBody(&form); err != nil {
				return e.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid request body"})
			}

			userIds := []string{}

			if form.Scope == "me" {
				userIds = []string{e.Auth.Id}
			}

			if form.Scope == "all" {

				// TODO: check ownership
				household, err := services.FindOwnedHouseholdAdminByUserId(app, e.Auth.Id, form.Household)
				if err != nil {
					return e.JSON(http.StatusServiceUnavailable, nil)
				}

				members, err := app.FindRecordsByFilter(
					"household_members",
					"household = {:household}",
					"created",
					1000,
					0,
					dbx.Params{"household": household.Id},
				)
				if err != nil {
					app.Logger().Error("[test-notification] cannot find household members", "error", err)
					return e.JSON(http.StatusServiceUnavailable, nil)
				}

				for _, u := range members {
					userIds = append(userIds, u.GetString("user"))
				}
			}

			count, err := services.NotifyTest(app, userIds)

			if err != nil {
				app.Logger().Error("[test-notification] cannot send test notifications", "error", err)
				return e.JSON(http.StatusServiceUnavailable, nil)
			}

			return e.JSON(http.StatusOK, count)

		})

		return se.Next()
	})
}
