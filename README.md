# ChoreZilla

<div align="center">

Manage your chores, assign to other users, get notified.

<p float="left" align="middle">
<img width="300" alt="Home screenshot" src="https://github.com/vincent/chorezilla/blob/main/screenshot1.png?raw=true">
<img width="300" alt="Rooms screenshot" src="https://github.com/vincent/chorezilla/blob/main/screenshot2.png?raw=true">
</p>

[![Static Badge](https://img.shields.io/badge/Svelte_5-ff6c47?style=for-the-badge)](https://svelte.dev)
[![Static Badge](https://img.shields.io/badge/Docker-1D63ED?style=for-the-badge)](https://www.docker.com)
[![Static Badge](https://img.shields.io/badge/PocketBase-b8dbe4?style=for-the-badge)](https://pocketbase.io)

</div>

## 📦 Features

- Manage different rooms
- Invite users
- Add tasks to a room with a frequency and assigned users
- Users get notified until task is done
- Admins get notified when task is done

## ⚡ Notifications

Notifications are sent only via webpush for now, it could evolve in the future.

## 🐳 Selfhosting

You can host the platform yourself using the public [docker image](//ghcr.io/vincent/chorezilla:main)

Check the [docker-compose](docker-compose.yml) file as an example.

## 🛠️ Tech Stack

Spoti.es is built upon [PocketBase](https://pocketbase.io) and [SvelteKit](https://kit.svelte.dev)

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
