# NextGenNews

Deploy this app as a single Node web service (Express API + built Vite frontend).

## Quick deploy options

### 1) Render (recommended for this repo)

This repo includes a `render.yaml`, so Render can auto-configure:

1. Push this repo to GitHub.
2. In Render: **New** -> **Blueprint** -> select this repo.
3. Render will create one web service using:
   - Build command: `npm ci && npm run build`
   - Start command: `npm run start`
4. Add environment variables in Render dashboard if needed:
   - `NODE_ENV=production` (set by Render automatically in most cases)
   - `PORT` (set automatically by Render)
   - Any app-specific secrets you add later

### 2) Railway

1. Push this repo to GitHub.
2. In Railway: **New Project** -> **Deploy from GitHub repo**.
3. Set:
   - Build command: `npm ci && npm run build`
   - Start command: `npm run start`
4. Railway provides `PORT` automatically.

## Local production check (optional)

```bash
npm ci
npm run build
npm run start
```

Then open `http://localhost:5000`.
