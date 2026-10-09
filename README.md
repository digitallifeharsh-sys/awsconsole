# AWS Service Console

React + Vite frontend preserving the existing Service Console layout. The SMS OTP → API & SDK section connects to the Node/Express backend in `digitallifeharsh-sys/awsconsole-backend`.

## Run locally

```bash
cp .env.example .env
npm install
npm run dev
```

Vite proxies `/api/*` to `http://localhost:5000` by default. Start the backend first and configure its `.env` and MySQL database. For another backend host, set `VITE_BACKEND_PROXY_TARGET` before starting Vite.

The 2Factor configuration page supports nickname, API key, SMS/call tokens, template IDs, configuration CRUD and real SMS/voice tests. Provider credentials are sent only to the backend; secrets are never returned in plaintext by the API.