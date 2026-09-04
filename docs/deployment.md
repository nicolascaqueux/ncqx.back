# Deployment guide

This document explains the simplest production setup for this project and is intended for a low-technical workflow.

## Recommended production setup

For this project, the simplest and most maintainable setup is:

- Frontend: Vercel
- CMS/backend: Strapi Cloud or Render
- Database: PostgreSQL managed service
- Media storage: Cloudinary or S3

This keeps the React frontend simple and lets the Strapi CMS handle content, media, and GraphQL APIs without needing custom server management.

## Why this is the best fit

The frontend is a Vite + React app and is a perfect match for Vercel.

The backend is a Strapi application and is not a static site. It needs:

- a database
- a Node runtime
- a production environment
- media handling
- a public API

Because of that, it is better to deploy the frontend and backend separately.

## Best option for non-technical users

If you want the least technical path:

- Frontend: Vercel
- Backend: Strapi Cloud
- Database: managed by the Strapi deployment environment

This is the easiest path because it minimizes server and infrastructure work.

## Very simple production architecture

```text
User browser
  -> Vercel frontend
      -> GraphQL requests to Strapi
          -> Postgres database
          -> uploaded media storage
```

## What to deploy where

### Frontend deployment

Deploy the React app to Vercel.

Typical flow:

1. Push the project to GitHub
2. Import the frontend repository in Vercel
3. Add environment variables:
   - VITE_API_URL
   - VITE_API_TOKEN
4. Configure the production domain
5. Trigger the first deployment

### Backend deployment

Deploy the Strapi project to Strapi Cloud or Render.

You will need:

- production database connection
- app keys and JWT secrets
- public URL configuration
- production environment variables

## Environment variables

### Frontend

```env
VITE_API_URL=https://your-strapi-domain.com
VITE_API_TOKEN=your-public-token
```

### Backend

Use production values for:

```env
HOST=0.0.0.0
PORT=1337
APP_KEYS=...
API_TOKEN_SALT=...
ADMIN_JWT_SECRET=...
TRANSFER_TOKEN_SALT=...
JWT_SECRET=...
DATABASE_CLIENT=postgres
DATABASE_URL=postgres://...
```

## Important production note

The current backend config is optimized for local development and SQLite. For production, switch the database to PostgreSQL.

The file to review is:

- config/database.ts

In production, SQLite is not the recommended long-term choice.

## Recommended hosting choices

### Easiest choice

- Vercel for frontend
- Strapi Cloud for backend

### Best balance of simplicity and control

- Vercel for frontend
- Render for backend
- Supabase or Railway Postgres for database

### Most scalable option

- Vercel for frontend
- DigitalOcean App Platform or Render for backend
- managed Postgres
- S3 or Cloudinary for media

## What to avoid

Avoid:

- running Strapi on a local machine in production
- using SQLite in production for a live site
- managing your own Node server unless you really want the complexity
- keeping API URL and tokens hardcoded in source files

## Final recommendation

For a non-technical setup, the best simple route is:

- Vercel for the frontend
- Strapi Cloud for the CMS/backend
- managed PostgreSQL

This gives the project a production-ready structure without requiring server administration.

## Useful next steps

1. Set up the frontend on Vercel
2. Set up the backend on Strapi Cloud or Render
3. Move the database to PostgreSQL
4. Add production environment variables
5. Test content publishing and GraphQL access
6. Verify media uploads and frontend rendering
