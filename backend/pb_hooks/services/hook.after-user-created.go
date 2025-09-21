package services

import (
	"strings"

	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/core"
)

func BindAfterUserCreateSuccessHook(app *pocketbase.PocketBase) {

	app.OnRecordAfterCreateSuccess("users").BindFunc(func(e *core.RecordEvent) error {
		user := e.Record
		email := user.GetString("email")

		user.Set("name", removeNonAlpha(strings.Split(user.GetString("email"), "@")[0]))
		if err := e.App.Save(user); err != nil {
			e.App.Logger().Error("[BindAfterUserCreateSuccessHook] cannot update user", "error", err)
			return err
		}

		invitation, err := e.App.FindFirstRecordByFilter("invitations", "email = {:email} && status = {:status}", map[string]any{
			"email":  email,
			"status": "pending",
		})

		if err != nil || invitation == nil {
			if err = createDefaultHousehold(e, e.Record); err != nil {
				e.App.Logger().Error("[BindPostSignUpInvitationHook] cannot create default household", "error", err)
				return err
			}

			e.App.Logger().Error("[BindPostSignUpInvitationHook] creates a default household", "user", user.Id)

			return e.Next()
		}

		if err = attachToInvitedHousehold(e, invitation, e.Record); err != nil {
			e.App.Logger().Error("[BindPostSignUpInvitationHook] cannot attach to invited household", "error", err)
			return err
		}

		e.App.Logger().Error("[BindPostSignUpInvitationHook] attach to invited household", "user", user.Id)

		return e.Next()
	})
}

func createDefaultHousehold(e *core.RecordEvent, user *core.Record) error {

	household, err := CreateHousehold(e.App, user.Id)
	if err != nil {
		e.App.Logger().Error("[createDefaultHousehold] cannot create household", "error", err)
		return err
	}

	_, err = CreateRoom(e.App, household.Id)
	if err != nil {
		e.App.Logger().Error("[createDefaultHousehold] cannot create household", "error", err)
		return err
	}

	return nil
}

func attachToInvitedHousehold(e *core.RecordEvent, invitation *core.Record, user *core.Record) error {

	invitation.Set("status", "accepted")
	if err := e.App.Save(invitation); err != nil {
		e.App.Logger().Error("[attachToInvitedHousehold] cannot update invitation", "error", err)
		return err
	}

	_, err := AddHouseholdMember(e.App, invitation.GetString("household"), user.Id, invitation.GetString("role"))
	if err != nil {
		e.App.Logger().Error("[attachToInvitedHousehold] cannot create household_member", "error", err)
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
