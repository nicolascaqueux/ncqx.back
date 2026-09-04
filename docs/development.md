# Development guide

## Coding standards

The frontend project uses modern JavaScript conventions and a Prettier-based formatter.

### Current formatting rules

From the frontend config:

- 2 spaces indentation
- single quotes
- no semicolons
- print width 100
- Tailwind plugin support for formatted class ordering

The frontend tools include:

- ESLint
- Prettier
- Prettier Tailwind plugin

## Useful commands

### Frontend

```bash
cd ncqx.front
npm run dev
npm run build
npm run lint
npm run format
npm run format:check
```

### Backend

```bash
cd ncqx.back
npm run develop
npm run build
npm run start
```

## Frontend structure conventions

The frontend is organized by feature and UI concern:

- components/
- containers/
- pages/
- hooks/
- lib/
- locales/
- queries/
- utils/

This keeps shared logic separate from page composition and content presentation.

## Backend conventions

The Strapi backend follows Strapi’s standard structure:

- src/api/<type>/content-types/<type>/schema.json
- src/api/<type>/controllers/<type>.ts
- src/api/<type>/routes/<type>.ts
- src/api/<type>/services/<type>.ts

When adding new collections, follow the same pattern to keep the API consistent and schema-driven.

## Recommended workflow

1. Define or update the content model in Strapi
2. Publish data and validate the GraphQL schema
3. Add or update the corresponding frontend GraphQL query
4. Render data in the appropriate React component
5. Run linting and formatting before committing

## Environment and deployment notes

- Local development uses a local Strapi runtime and a frontend Vite dev server
- Production deployment should keep API URL and token values in a secure environment layer
- Database settings should be managed via environment variables instead of hardcoded values

## Example quality checks

Before finalizing changes:

```bash
cd ncqx.front
npm run format:check
npm run lint
```

If you are starting the full stack locally:

```bash
cd ncqx.back && npm run develop
cd ../ncqx.front && npm run dev
```
