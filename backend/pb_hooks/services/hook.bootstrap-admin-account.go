package services

import (
	"fmt"
	"os"
	"strings"

	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/core"
)

func BindBootstrapAdminAccount(app *pocketbase.PocketBase) {

	emailVar := "CHOREZILLA_ADMIN_EMAIL"
	passwVar := "CHOREZILLA_ADMIN_PASSWORD"

	email := strings.TrimSpace(os.Getenv(emailVar))
	password := strings.TrimSpace(os.Getenv(passwVar))

	if email == "" && password == "" {
		return

	} else if (email != "" && password == "") || (email == "" && password != "") {
		panic(fmt.Sprintf("You must define none, or both %s and %s", emailVar, passwVar))
	}

	app.OnBootstrap().BindFunc(func(e *core.BootstrapEvent) error {
		if err := e.Next(); err != nil {
			return err
		}

		admin, err := e.App.FindAuthRecordByEmail("_superusers", email)
		if err != nil {
			e.App.Logger().Info("Creating the admin account from environment variables", "admin", email)

			superusers, err := app.FindCollectionByNameOrId("_superusers")
			if err != nil {
				e.App.Logger().Error("cannot create superuser", "error", err)
				panic(fmt.Errorf("cannot create superuser: %s", err))
			}

			admin := core.NewRecord(superusers)
			admin.SetEmail(email)
			admin.SetPassword(password)

			err = app.Save(admin)
			if err != nil {
				e.App.Logger().Error("cannot create superuser", "error", err)
				panic(fmt.Errorf("cannot create superuser: %s", err))
			}

		} else {
			e.App.Logger().Info("Updating the admin account from environment variables", "admin", admin.Email())

			admin.SetEmail(email)
			admin.SetPassword(password)

			err = app.Save(admin)
			if err != nil {
				panic(fmt.Errorf("cannot create superuser: %s", err))
			}
		}

		return nil
	})
}
