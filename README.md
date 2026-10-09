# AWS Service Console

This repository contains the existing React + Vite Service Console UI. The SMS OTP → API & SDK page is connected to `digitallifeharsh-sys/awsconsole-backend` for 2Factor configuration, configuration CRUD, and test SMS/voice calls.

## Run locally

```bash
cp .env.example .env
npm install
npm run dev
```

Start the backend on port 5000 first. Vite proxies `/api` to `http://localhost:5000`. Change `VITE_BACKEND_PROXY_TARGET` in `.env` when the backend runs elsewhere.

The API key, SMS token and call token are sent to the backend only. The backend encrypts secrets at rest and returns masked values. Real provider tests require valid 2Factor credentials, approved templates and available credits.