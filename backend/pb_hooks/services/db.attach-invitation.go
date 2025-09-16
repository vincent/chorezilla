package services

import (
	"strings"

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
			if err = createDefaultHousehold(e); err != nil {
				e.App.Logger().Error("[new-user] cannot create default household", "error", err)
				return err
			}

			e.App.Logger().Error("[new-user] creates a default household", "user", user.Id)

			return e.Next()
		}

		if err = attachToInvitedHousehold(e, invitation); err != nil {
			e.App.Logger().Error("[invitations] cannot attach to invited household", "error", err)
			return err
		}

		e.App.Logger().Error("[invitations] attach to invited household", "user", user.Id)

		return e.Next()
	})
}

func attachToInvitedHousehold(e *core.RecordEvent, invitation *core.Record) error {
	user := e.Record

	// Update invitation status to "accepted"
	invitation.Set("status", "accepted")
	if err := e.App.Save(invitation); err != nil {
		e.App.Logger().Error("[invitations] cannot update invitation", "error", err)
		return err
	}

	// Create household_members row
	collection, err := e.App.FindCollectionByNameOrId("household_members")
	if err != nil {
		e.App.Logger().Error("[invitations] cannot find collection", "error", err)
		return err
	}
	householdId := invitation.GetString("household")
	role := invitation.GetString("role")

	member := core.NewRecord(collection)
	member.Set("household", householdId)
	member.Set("user", user.Id)
	member.Set("role", role)

	if err := e.App.Save(member); err != nil {
		e.App.Logger().Error("[invitations] cannot create household_member", "error", err)
		return err
	}

	// Update user row
	user.Set("username", invitation.GetString("name"))
	user.Set("households", householdId)
	if err := e.App.Save(user); err != nil {
		e.App.Logger().Error("[invitations] cannot update user", "error", err)
		return err
	}

	return nil
}

func createDefaultHousehold(e *core.RecordEvent) error {
	user := e.Record

	// Create household row
	households, err := e.App.FindCollectionByNameOrId("households")
	if err != nil {
		e.App.Logger().Error("[new-user] cannot find collection", "error", err)
		return err
	}

	// Create households row
	household := core.NewRecord(households)
	household.Set("name", "Home")

	if err := e.App.Save(household); err != nil {
		e.App.Logger().Error("[new-user] cannot create household", "error", err)
		return err
	}

	rooms, err := e.App.FindCollectionByNameOrId("rooms")
	if err != nil {
		e.App.Logger().Error("[new-user] cannot find collection", "error", err)
		return err
	}

	// Create rooms row
	room := core.NewRecord(rooms)
	room.Set("name", "Main room")
	room.Set("location", "Home")
	room.Set("description", "Your first room")
	room.Set("color", "indigo")
	room.Set("household", household.Id)

	if err := e.App.Save(room); err != nil {
		e.App.Logger().Error("[new-user] cannot create household", "error", err)
		return err
	}

	// Create household_members row
	householdMembers, err := e.App.FindCollectionByNameOrId("household_members")
	if err != nil {
		e.App.Logger().Error("[new-user] cannot find collection", "error", err)
		return err
	}

	member := core.NewRecord(householdMembers)
	member.Set("household", household.Id)
	member.Set("user", user.Id)
	member.Set("role", "admin")

	if err := e.App.Save(member); err != nil {
		e.App.Logger().Error("[new-user] cannot create household_member", "error", err)
		return err
	}

	// Update user row
	user.Set("households", household.Id)
	user.Set("name", removeNonAlpha(strings.Split(user.GetString("email"), "@")[0]))
	e.App.Logger().Error("[new-user] try to save user", "user", user)
	if err := e.App.Save(user); err != nil {
		e.App.Logger().Error("[new-user] cannot update user", "error", err)
		return err
	}

	return nil
}

// removeNonAlpha removes all non-alpha characters from a string
func removeNonAlpha(s string) string {
	var b strings.Builder
	for _, r := range s {
		if (r >= 'A' && r <= 'Z') || (r >= 'a' && r <= 'z') {
			b.WriteRune(r)
		}
	}
	return b.String()
}
