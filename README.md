# 225 West 24th — Work Order Dashboard

**NYC Tech Week 2026 Hackathon — "The City Hacks The State"**

A real-time dashboard that pulls live work orders from CriticalAsset's GraphQL API for an NYC school building portfolio. Helps building operators make Monday-morning maintenance decisions at a glance.

## Architecture

```
┌─────────────────────┐       ┌──────────────────────┐       ┌─────────────────────┐
│   React Frontend    │──────▶│   Express Backend    │──────▶│  CriticalAsset API  │
│   (Vite + Recharts) │ :5173 │   (Node.js)          │ :3001 │  (GraphQL @ /api)   │
└─────────────────────┘       └──────────────────────┘       └─────────────────────┘
```

## Quick Start

### 1. Backend

```bash
cd backend
cp .env.example .env    # Add your Client ID & Secret
npm install
npm run dev
```

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

Visit **http://localhost:5173** — the Vite dev server proxies `/api` calls to the backend.

## Features

- **Stats at a glance** — Total, Critical, Open, High-Priority work order counts
- **Severity breakdown** — Bar chart of work orders by severity level
- **Top 5 buildings** — Ranked list of buildings with the most open work orders
- **Filterable work order table** — Filter by severity, see asset + location joins
- **Auto-refreshing OAuth2** — Token cached server-side, refreshes on 401

## Bonus Points Covered

- ✅ Work orders joined to **assets** (category, status)
- ✅ Work orders joined to **locations** (building name, address)
- ✅ Top 5 buildings by open work orders

## Tech Stack

| Layer     | Tech                     |
|-----------|--------------------------|
| Frontend  | React 18, Vite, Recharts |
| Backend   | Node.js, Express         |
| API       | CriticalAsset GraphQL    |
| Auth      | OAuth2 Client Credentials|

## Environment Variables

| Variable          | Description                           |
|-------------------|---------------------------------------|
| `CA_CLIENT_ID`    | CriticalAsset Developer Console App ID|
| `CA_CLIENT_SECRET`| App secret (never commit this!)       |
| `CA_API_URL`      | GraphQL endpoint URL                  |
| `PORT`            | Backend port (default 3001)           |

## Team

**225 West Team 4** — NYC Tech Week 2026
