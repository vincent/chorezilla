# ChoreZilla

<div align="center">

Manage your chores, assign to other users, get notified.

<p float="left" align="middle">
<img width="220" alt="Home screenshot" src="https://github.com/vincent/chorezilla/blob/main/screenshot1.png?raw=true">
<img width="220" alt="Rooms screenshot" src="https://github.com/vincent/chorezilla/blob/main/screenshot2.png?raw=true">
<img width="220" alt="Notification screenshot" src="https://github.com/vincent/chorezilla/blob/main/screenshot3.png?raw=true">
<img width="220" alt="Members screenshot" src="https://github.com/vincent/chorezilla/blob/main/screenshot4.png?raw=true">
<img width="220" alt="Rooms screenshot" src="https://github.com/vincent/chorezilla/blob/main/screenshot5.png?raw=true">
<img width="220" alt="Chore form screenshot" src="https://github.com/vincent/chorezilla/blob/main/screenshot6.png?raw=true">
</p>

[![Static Badge](https://img.shields.io/badge/Svelte_5-ff6c47?style=for-the-badge)](https://svelte.dev)
[![Static Badge](https://img.shields.io/badge/Docker-1D63ED?style=for-the-badge)](https://www.docker.com)
[![Static Badge](https://img.shields.io/badge/PocketBase-b8dbe4?style=for-the-badge)](https://pocketbase.io)

</div>

## 📦 Features

- Manage different households
- Manage different rooms
- Invite users
- Add tasks to a room, with a frequency and assigned users
- Users get notified until task is done
- Admins get notified when task is done

## ⚡ Notifications

Notifications are sent only via webpush for now, it could evolve in the future.

#### Web push
You'll need to generate VAPID keys, for example using [this tool online](https://www.stephane-quantin.com/en/tools/generators/vapid-keys) or the [provided go script](https://github.com/vincent/chorezilla/blob/main/backend/scripts/generate-vapid-keys/main.go)


## 🐳 Selfhosting

You can host the platform yourself using the public [docker image](//ghcr.io/vincent/chorezilla:main)

Check the [docker-compose](docker-compose.yml) file as an example.

In case you need it, the pocketbase admin panel is available on [https://your.instance/_](https://your.instance/_)

## 🛠️ Tech Stack

Built upon [PocketBase](https://pocketbase.io) and [SvelteKit](https://kit.svelte.dev)

## 📖 Development

Start the backend with

```shell
cd backend
./modd # will show an url to create the first admin 
```

Start the frontend with

```shell
cd frontend
npm install
npm run dev
```

## 📄 License

This project is licensed under the AGPL-3.0 License - see the [LICENSE](LICENSE.md) file for details.
