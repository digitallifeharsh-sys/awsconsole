# AWS Service Console

This repository contains the existing React + Vite Service Console UI. The SMS OTP → API & SDK page is connected to `digitallifeharsh-sys/awsconsole-backend` for 2Factor configuration, configuration CRUD, and test SMS/voice calls.

## Run locally

```bash
cp .env.example .env
npm install
npm run dev
```

Start the backend on port 5000 first. In the backend `.env`, set `CONSOLE_ADMIN_TOKEN` to a long random secret and `CREDENTIAL_ENCRYPTION_KEY` to the output of `openssl rand -hex 32`. Vite proxies `/api` to `http://localhost:5000`; change `VITE_BACKEND_PROXY_TARGET` when needed. Open SMS OTP → API & SDK, enter the same backend admin token in Backend Admin Key, and click Connect & Load.

The API key, SMS token and call token are sent to the backend only. The backend encrypts secrets at rest and returns masked values. Real provider tests require valid 2Factor credentials, approved templates and available credits.