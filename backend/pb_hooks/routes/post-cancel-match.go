// Package pb_routes provides custom route handlers for the application.
package pb_routes

import (
	"net/http"
	"pocketbase/pb_hooks/services"

	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/apis"
	"github.com/pocketbase/pocketbase/core"
)

// cancelMatchRequest represents the expected request body.
type cancelMatchRequest struct {
	MatchId string `json:"match"`
}

// RegisterCancelMatchRoute registers the /api/config GET route.
func RegisterCancelMatchRoute(app *pocketbase.PocketBase, hooksDir string) {
	app.OnServe().BindFunc(func(se *core.ServeEvent) error {
		se.Router.POST("/api/match/cancel", func(e *core.RequestEvent) error {

			// Parse request body
			var form cancelMatchRequest
			if err := e.BindBody(&form); err != nil {
				return e.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid request body"})
			}

			if _, err := services.CancelMatch(app, e.Auth.Id, form.MatchId); err != nil {
				return e.JSON(http.StatusInternalServerError, map[string]string{"error": "cannot cancel match"})
			}

			return e.JSON(http.StatusOK, nil)

		}).Bind(apis.RequireAuth())

		return se.Next()
	})
}
