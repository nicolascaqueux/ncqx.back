# Documentation index

This directory contains the operational and technical documentation for the NCQX project.

## Contents

- [getting-started.md](getting-started.md) — install, launch, and configure both apps
- [architecture.md](architecture.md) — component, stack, and data-flow overview
- [content-models.md](content-models.md) — backend content types and relationships
- [development.md](development.md) — coding conventions, linting, and formatting

## Project overview

NCQX is composed of:

- a Vite + React frontend in [../ncqx.front](../ncqx.front)
- a Strapi CMS backend in [../ncqx.back](../ncqx.back)

The frontend uses GraphQL to query content from the CMS and renders blog, music, photography, and editorial pages. The backend manages content lifecycle, media assets, category relationships, and API access.

## Start here

If you are new to the project, begin with [getting-started.md](getting-started.md).
