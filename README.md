# NextGenNews

NextGenNews is a modern full-stack news website built with a React frontend and an Express backend.

## Live Website

Add your deployed URL here so visitors can open the site:

`https://nextgennews.onrender.com/`

## Project Overview

- News homepage with featured stories, latest feed, and category-based content blocks
- Dynamic article detail pages loaded by slug
- Admin panel at `/admin` for creating, editing, and deleting articles
- REST API for article CRUD operations
- PostgreSQL-ready schema via Drizzle ORM

## Tech Stack

- Frontend: React, Vite, TypeScript, Tailwind CSS, TanStack Query, Wouter
- Backend: Node.js, Express, TypeScript
- Database: PostgreSQL + Drizzle ORM

## Core Features

- Article listing endpoint: `GET /api/articles`
- Single article endpoint: `GET /api/articles/:slug`
- Admin create endpoint: `POST /api/admin/articles`
- Admin update endpoint: `PATCH /api/admin/articles/:id`
- Admin delete endpoint: `DELETE /api/admin/articles/:id`

## Admin Access

- Admin panel URL: `https://nextgennews.onrender.com/admin`
- Set these environment variables on Render:
  - `ADMIN_USERNAME` (example: `admin`)
  - `ADMIN_PASSWORD` (required)
  - `SESSION_SECRET` (required, long random string)

## Run Locally

```bash
npm ci
npm run dev
```
