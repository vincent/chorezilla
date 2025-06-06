// Package pb_routes provides custom route handlers for the application.
package pb_routes

import (
	"net/http"
	"pocketbase/pb_hooks/services"

	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/apis"
	"github.com/pocketbase/pocketbase/core"
)

// prepareMatchRequest represents the expected request body.
type prepareMatchRequest struct {
	CourtId string `json:"court"`
}

// RegisterPrepareMatchRoute registers the /api/config GET route.
func RegisterPrepareMatchRoute(app *pocketbase.PocketBase, hooksDir string) {
	app.OnServe().BindFunc(func(se *core.ServeEvent) error {
		se.Router.POST("/api/match/prepare", func(e *core.RequestEvent) error {

			// Parse request body
			var form prepareMatchRequest
			if err := e.BindBody(&form); err != nil {
				return e.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid request body"})
			}

			m, err := services.PrepareMatch(app, e.Auth.Id, form.CourtId)
			if err != nil {
				return e.JSON(http.StatusInternalServerError, map[string]string{"error": "cannot prepare match"})
			}

			return e.JSON(http.StatusOK, m.FieldsData())

		}).Bind(apis.RequireAuth())

		return se.Next()
	})
}
