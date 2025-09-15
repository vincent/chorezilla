# ¿ChoreZilla?

<div align="center">

Subscribe to your local sport place, and call for challengers.

[![Static Badge](https://img.shields.io/badge/Svelte_5-ff6c47?style=for-the-badge)](https://svelte.dev)
[![Static Badge](https://img.shields.io/badge/Docker-1D63ED?style=for-the-badge)](https://www.docker.com)
[![Static Badge](https://img.shields.io/badge/PocketBase-b8dbe4?style=for-the-badge)](https://pocketbase.io)

</div>

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
