// Package pb_routes provides custom route handlers for the application.
package pb_routes

import (
	"net/http"
	"net/mail"
	"pocketbase/pb_hooks/db"

	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/core"
	"github.com/pocketbase/pocketbase/tools/mailer"
	"github.com/pocketbase/pocketbase/tools/template"
)

// sendInviteRequest represents the expected request body.
type sendInviteRequest struct {
	Household string `json:"household"`
	Email     string `json:"email"`
	Name      string `json:"name"`
	Role      string `json:"role"`
}

// RegisterSendInvitationRoute registers the /api/send-invitation POST route.
func RegisterSendInvitationRoute(app *pocketbase.PocketBase) {
	app.OnServe().BindFunc(func(se *core.ServeEvent) error {
		se.Router.POST("/api/send-invitation", func(e *core.RequestEvent) error {

			// Parse request body
			var form sendInviteRequest
			if err := e.BindBody(&form); err != nil {
				return e.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid request body"})
			}

			household, err := db.FindOwnedHouseholdAdminByUserId(app, e.Auth.Id, form.Household)
			if err != nil {
				return e.JSON(http.StatusServiceUnavailable, nil)
			}

			invitation, err := db.UpsertInvitationForHousehold(app, household.Id, form.Email, form.Name, form.Role)
			if invitation == nil || err != nil {
				return e.JSON(http.StatusBadRequest, map[string]string{"error": "cannot invite"})
			}
			if invitation.GetString("status") != "pending" {
				return e.JSON(http.StatusBadRequest, map[string]string{"error": "already invited"})
			}

			data := map[string]any{
				"household_name": household.GetString("name"),
				"admin_name":     e.Auth.Email(),
				"meta": map[string]interface{}{
					"appName":       app.Settings().Meta.AppName,
					"appURL":        app.Settings().Meta.AppURL,
					"senderName":    app.Settings().Meta.SenderName,
					"senderAddress": app.Settings().Meta.SenderAddress,
				},
			}

			html, err := template.NewRegistry().LoadFiles(
				"pb_hooks/views/emails/layout.html",
				"pb_hooks/views/emails/user.invitation.html",
			).Render(data)

			message := &mailer.Message{
				From: mail.Address{
					Address: e.App.Settings().Meta.SenderAddress,
					Name:    e.App.Settings().Meta.SenderName,
				},
				To:      []mail.Address{{Address: form.Email}},
				Subject: "You have been invited to " + household.GetString("name"),
				HTML:    html,
			}

			if err != nil {
				app.Logger().Error("[SendInvitation] cannot prepare email", "error", err)
				return e.JSON(http.StatusServiceUnavailable, nil)
			}

			err = e.App.NewMailClient().Send(message)
			if err != nil {
				app.Logger().Error("[SendInvitation] cannot send email", "error", err)
				return e.JSON(http.StatusServiceUnavailable, nil)
			}

			return e.JSON(http.StatusOK, nil)

		})

		return se.Next()
	})
}
