// Package pb_routes provides custom route handlers for the application.
package pb_routes

import (
	"net/http"
	"pocketbase/pb_hooks/services"

	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/core"
)

// challengerRequest represents the expected request body.
type challengerRequest struct {
	CourtId string `json:"courtId"`
	Enabled bool   `json:"enabled"`
}

// RegisterSetCourtChallengerRoute registers the /api/config GET route.
func RegisterSetCourtChallengerRoute(app *pocketbase.PocketBase, hooksDir string) {
	app.OnServe().BindFunc(func(se *core.ServeEvent) error {
		se.Router.POST("/api/court/challenger", func(e *core.RequestEvent) error {

			// Parse request body
			var form challengerRequest
			if err := e.BindBody(&form); err != nil {
				return e.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid request body"})
			}

			if err := services.SetCourtChallenger(app, e.Auth.Id, form.CourtId, form.Enabled); err != nil {
				return e.JSON(http.StatusInternalServerError, map[string]string{"error": "cannot insert record"})
			}

			return e.JSON(http.StatusOK, nil)
		})

		return se.Next()
	})
}
