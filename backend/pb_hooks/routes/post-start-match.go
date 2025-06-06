// Package pb_routes provides custom route handlers for the application.
package pb_routes

import (
	"net/http"
	"pocketbase/pb_hooks/services"

	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/apis"
	"github.com/pocketbase/pocketbase/core"
)

// startMatchRequest represents the expected request body.
type startMatchRequest struct {
	MatchId string `json:"match"`
}

// RegisterStartMatchRoute registers the /api/config GET route.
func RegisterStartMatchRoute(app *pocketbase.PocketBase, hooksDir string) {
	app.OnServe().BindFunc(func(se *core.ServeEvent) error {
		se.Router.POST("/api/match/start", func(e *core.RequestEvent) error {

			// Parse request body
			var form startMatchRequest
			if err := e.BindBody(&form); err != nil {
				return e.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid request body"})
			}

			if _, err := services.StartMatch(app, e.Auth.Id, form.MatchId); err != nil {
				return e.JSON(http.StatusInternalServerError, map[string]string{"error": "cannot start match"})
			}

			return e.JSON(http.StatusOK, nil)

		}).Bind(apis.RequireAuth())

		return se.Next()
	})
}
