package services

import (
	"fmt"
	"os"
	"strconv"
	"strings"

	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/core"
)

func BindBootstrapSMTPConfig(app *pocketbase.PocketBase) {

	hostVar := "CHOREZILLA_SMTP_HOST"
	usernameVar := "CHOREZILLA_SMTP_USERNAME"
	passwordVar := "CHOREZILLA_SMTP_PASSWORD"
	portVar := "CHOREZILLA_SMTP_PORT"

	// optionals
	authmethodVar := "CHOREZILLA_SMTP_AUTHMETHOD"
	tlsVar := "CHOREZILLA_SMTP_TLS"
	localnameVar := "CHOREZILLA_SMTP_LOCALNAME"

	host := strings.TrimSpace(os.Getenv(hostVar))
	username := strings.TrimSpace(os.Getenv(usernameVar))
	password := strings.TrimSpace(os.Getenv(passwordVar))

	if len(host) == 0 || len(username) == 0 || len(password) == 0 {
		return
	}

	var err error
	portNumber := 587
	port := strings.TrimSpace(os.Getenv(portVar))
	if len(port) > 0 {
		portNumber, err = strconv.Atoi(port)
		if err != nil {
			panic(fmt.Sprintf("%s %s is not a number", portVar, port))
		}
	}
	authmethod := strings.ToUpper(strings.TrimSpace(os.Getenv(authmethodVar)))
	tls := strings.ToUpper(strings.TrimSpace(os.Getenv(tlsVar))) != "FALSE"
	localname := strings.TrimSpace(os.Getenv(localnameVar))

	app.OnBootstrap().BindFunc(func(e *core.BootstrapEvent) error {
		if err := e.Next(); err != nil {
			return err
		}

		e.App.Settings().SMTP.Port = portNumber
		e.App.Settings().SMTP.Host = host
		e.App.Settings().SMTP.Username = username
		e.App.Settings().SMTP.Password = password
		e.App.Settings().SMTP.TLS = tls
		if len(authmethod) > 0 {
			e.App.Settings().SMTP.AuthMethod = authmethod
		}
		if len(localname) > 0 {
			e.App.Settings().SMTP.LocalName = localname
		}

		err = e.App.Settings().SMTP.Validate()

		if err != nil {
			e.App.Logger().Error("cannot validate SMTP config", "error", err)
			panic(fmt.Errorf("cannot validate SMTP config: %s", err))

		} else {
			e.App.Logger().Info("Updating SMTP config from environment variables")
		}

		return nil
	})
}
