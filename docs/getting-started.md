# Getting started

This guide explains how to install and run both sides of the NCQX project.

## Prerequisites

- Node.js 18 or newer
- npm 9 or newer
- Git
- A local or remote database for Strapi if you are not using SQLite

## 1) Install dependencies

```bash
cd ncqx.back && npm install
cd ../ncqx.front && npm install
```

## 2) Configure the backend

The Strapi project includes an example environment file at [../ncqx.back/.env.example](../ncqx.back/.env.example).

Create your local environment file:

```bash
cd ../ncqx.back
cp .env.example .env
```

Then update the generated values:

```env
HOST=0.0.0.0
PORT=1337
APP_KEYS="your-key-1,your-key-2"
API_TOKEN_SALT=your-api-token-salt
ADMIN_JWT_SECRET=your-admin-secret
TRANSFER_TOKEN_SALT=your-transfer-salt
JWT_SECRET=your-jwt-secret
ENCRYPTION_KEY=your-encryption-key
DATABASE_CLIENT=sqlite
DATABASE_FILENAME=.tmp/data.db
```

For PostgreSQL deployments, switch to `DATABASE_CLIENT=postgres` and configure `DATABASE_URL` plus the required SSL settings.

## 3) Run the backend

```bash
cd ncqx.back
npm run develop
```

This starts Strapi in development mode with auto-reload enabled.

### Access points

- Admin UI: http://localhost:1337/admin
- GraphQL endpoint: http://localhost:1337/graphql

## 4) Configure the frontend

The frontend expects runtime environment variables for the API connection. Create a `.env` file in [../ncqx.front](../ncqx.front):

```env
VITE_API_URL=http://localhost:1337
VITE_API_TOKEN=your-strapi-token
```

This can be a generated Strapi token from the admin or a server-side token configured for your setup.

## 5) Run the frontend

```bash
cd ncqx.front
npm run dev
```

The frontend is configured to run on port `5174` and proxies GraphQL requests to the Strapi backend locally.

## Common startup sequence

```bash
# terminal 1
cd ncqx.back
npm run develop

# terminal 2
cd ncqx.front
npm run dev
```

## Production builds

### Frontend

```bash
cd ncqx.front
npm run build
```

### Backend

```bash
cd ncqx.back
npm run build
npm run start
```

## Troubleshooting

### Strapi fails to start

- confirm your environment keys are populated
- confirm your database config is valid
- check whether the `.tmp` directory exists for SQLite

### Frontend cannot reach CMS

- ensure the backend is running on port 1337
- confirm `VITE_API_URL` points to the correct host
- confirm the token has the required permission scope

### GraphQL errors

- ensure the GraphQL plugin is available in Strapi
- confirm the requested content types exist in the CMS schema
- verify the content has been published if draft mode is enabled
