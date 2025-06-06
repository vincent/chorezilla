// Package pb_routes provides custom route handlers for the application.
package pb_routes

import (
	"net/http"
	"pocketbase/pb_hooks/services"

	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/core"
)

// subscriptionRequest represents the expected request body.
type subscriptionRequest struct {
	Subscription string `json:"subscription"`
}

// RegisterAddSubscriptionRoute registers the /api/config GET route.
func RegisterAddSubscriptionRoute(app *pocketbase.PocketBase, hooksDir string) {
	app.OnServe().BindFunc(func(se *core.ServeEvent) error {
		se.Router.POST("/api/subscription/add", func(e *core.RequestEvent) error {

			// Parse request body
			var form subscriptionRequest
			if err := e.BindBody(&form); err != nil {
				return e.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid request body"})
			}

			if _, err := services.AddSubscription(app, e.Auth.Id, form.Subscription); err != nil {
				return e.JSON(http.StatusInternalServerError, map[string]string{"error": "cannot insert record"})
			}

			return e.JSON(http.StatusOK, nil)
		})

		return se.Next()
	})
}
