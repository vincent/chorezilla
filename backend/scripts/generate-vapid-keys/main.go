package main

import (
	"log"

	webpush "github.com/SherClockHolmes/webpush-go"
)

func main() {

	privateKey, publicKey, err := webpush.GenerateVAPIDKeys()
	if err != nil {
		// TODO: Handle error
	}
	log.Printf("JUGAMOS_VAPID_PUBLIC_KEY=%s", publicKey)
	log.Printf("JUGAMOS_VAPID_PRIVATE_KEY=%s", privateKey)
}
