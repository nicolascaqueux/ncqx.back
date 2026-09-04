# Architecture overview

## High-level structure

NCQX is divided into two runtime projects:

1. Frontend: React app for the public website
2. Backend: Strapi CMS and API layer

This separation keeps the presentation layer independent from content authoring and data management.

## Frontend architecture

The frontend in [../ncqx.front](../ncqx.front) uses:

- Vite for development and build
- React Router for page routing
- Apollo Client for GraphQL request handling
- Tailwind CSS for styling
- reusable component folders for pages, sections, and UI elements

### Main frontend flow

- App bootstraps in [ncqx.front/src/index.jsx](../ncqx.front/src/index.jsx)
- App shell is assembled in [ncqx.front/src/containers/App/App.jsx](../ncqx.front/src/containers/App/App.jsx)
- Providers wrap the app for i18n, theme, and scheme configuration
- Route handlers load page-level components based on URL
- GraphQL queries fetch Strapi collections such as blog, music, and photo entries

### Frontend data layer

The public site relies on Apollo and GraphQL queries under [ncqx.front/src/queries](../ncqx.front/src/queries).

Examples:

- blog queries
- music queries
- photography queries
- latest-content queries for home page previews

The Apollo client is defined in [ncqx.front/src/lib/apolloClient.jsx](../ncqx.front/src/lib/apolloClient.jsx), and it attaches the bearer token and GraphQL endpoint.

## Backend architecture

The backend in [../ncqx.back](../ncqx.back) is a Strapi application.

### Strapi responsibilities

- content authoring and publishing
- media upload handling
- GraphQL API generation
- relation management between content types
- schema-driven content models

The application entrypoint is [ncqx.back/src/index.ts](../ncqx.back/src/index.ts). The main config files live under [ncqx.back/config](../ncqx.back/config), including:

- server.ts
- database.ts
- admin.ts
- api.ts
- plugins.ts

### Content collection structure

The backend defines collection types in [ncqx.back/src/api](../ncqx.back/src/api):

- blog-post
- music-post
- photo-post
- category

Each collection type has:

- schema.json
- controller.ts
- route.ts
- service.ts

This structure is typical of Strapi and makes the API extendable without changing the runtime shell.

## Content flow

```text
Strapi CMS
  -> content types + media + relations
  -> GraphQL API
  -> React frontend
  -> pages, lists, and detail views
```

## Routing and page model

The frontend uses URL-based navigation for sections such as:

- /home
- /blog
- /blog/:uid
- /music
- /photography
- /faq

The app also includes shared UI sections such as:

- header
- footer
- newsletter signup area
- language switcher
- theme and scheme controls

## Design principles

- API-first rendering from Strapi content
- separation between CMS and UI logic
- reusable sections and page components
- support for multiple content formats: article, media item, and gallery data
- localization-ready architecture via context-based i18n setup
