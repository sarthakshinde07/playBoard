# Render Deployment Guide (PlayBoard)

This repository deploys as two Render Web Services:
- backend service from `server/`
- frontend service from `client/`

## 1) Pre-deploy checks

Run these locally from the repository root:

```bash
cd server && npm ci && npm run build
cd ../client && npm ci && npm run build
```

If either build fails, fix that before deploying.

## 2) Push code to GitHub

Render connects directly to your repo.

## 3) Create services in Render

You can use either method:
- Blueprint method (recommended): use `render.yaml` from this repo.
- Manual method: create each web service in UI using the exact commands below.

### Backend service settings

- Service type: Web Service
- Root directory: `server`
- Runtime: Node
- Build command: `npm ci && npm run build`
- Start command: `npm start`
- Health check path: `/healthz`

Backend environment variables:

- `NODE_ENV=production`
- `CLIENT_ORIGINS=https://<your-frontend-service>.onrender.com`

Do not set `PORT`; Render injects it automatically.

### Frontend service settings

- Service type: Web Service
- Root directory: `client`
- Runtime: Node
- Build command: `npm ci && npm run build`
- Start command: `npm run start`

Frontend environment variables:

- `NODE_ENV=production`
- `NEXT_PUBLIC_SERVER_URL=https://<your-backend-service>.onrender.com`

## 4) Deploy order

1. Deploy backend first.
2. Copy backend Render URL.
3. Set frontend `NEXT_PUBLIC_SERVER_URL` to backend URL.
4. Deploy frontend.
5. Set backend `CLIENT_ORIGINS` to frontend URL.
6. Redeploy backend (required after env update).

## 5) Verify production

- Backend health check:
  - `https://<your-backend-service>.onrender.com/healthz`
  - Expected: `{ "status": "ok" }`
- Frontend loads without console errors.
- Open two browser tabs and confirm real-time sync works.

## 6) Common pitfalls

- `NEXT_PUBLIC_SERVER_URL` must be HTTPS in production.
- If CORS errors appear, verify `CLIENT_ORIGINS` exactly matches frontend origin.
- Free instances can sleep; first connection after idle may be slower.

## 7) Recommended production upgrades

- Use paid plans to avoid sleep for realtime workloads.
- Add persistent datastore if room state must survive restarts.
- Add centralized logging and error monitoring.
