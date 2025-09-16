package services

import (
	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/core"
)

func BindPostSignUpInvitationHook(app *pocketbase.PocketBase) {

	app.OnRecordAfterCreateSuccess("users").BindFunc(func(e *core.RecordEvent) error {
		user := e.Record
		email := user.GetString("email")

		// Find pending invitation for this email
		invitation, err := e.App.FindFirstRecordByFilter("invitations", "email = {:email} && status = {:status}", map[string]any{
			"email":  email,
			"status": "pending",
		})
		if err != nil || invitation == nil {
			// No invitation found, just continue
			return e.Next()
		}

		// Update invitation status to "accepted"
		invitation.Set("status", "accepted")
		if err := e.App.Save(invitation); err != nil {
			app.Logger().Error("[invitations] cannot update invitation", "error", err)
			return err
		}

		// Create household_members row
		collection, err := app.FindCollectionByNameOrId("household_members")
		if err != nil {
			app.Logger().Error("[invitations] cannot find collection", "error", err)
			return err
		}
		householdId := invitation.GetString("household")
		role := invitation.GetString("role")
		member := core.NewRecord(collection)
		member.Set("household", householdId)
		member.Set("user", user.Id)
		member.Set("role", role)

		if err := e.App.Save(member); err != nil {
			app.Logger().Error("[invitations] cannot create household_member", "error", err)
			return err
		}

		// Update user row
		user.Set("households", householdId)
		if err := e.App.Save(user); err != nil {
			app.Logger().Error("[invitations] cannot update user", "error", err)
			return err
		}

		return e.Next()
	})
}
