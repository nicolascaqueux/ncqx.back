# Content models

This project is built around a small editorial CMS with media-rich content.

## Content types

### 1) Category

The `category` collection organizes entries by taxonomy.

Relevant relationships:

- blog posts can belong to many categories
- music posts can belong to many categories
- photo posts can belong to many categories

This allows the frontend to filter and group content by topic.

### 2) Blog post

The `blog-post` collection includes:

- `title` (required)
- `thumbnail` (media, required)
- `description` (text, required)
- `cover` (media, required)
- `content` (rich text, required)
- `categories` (many-to-many relation)
- `uid` (unique route identifier)

This supports article-style pages and rich content editing inside Strapi.

### 3) Music post

The `music-post` collection includes:

- `title` (required)
- `album` (optional)
- `release_date` (required)
- `isAlbum` (boolean)
- `src` (required source/audio URL or path)
- `thumbnail` (optional media)
- `categories` (many-to-many relation)
- `uid` (unique route identifier)

This is used to render music listings or track/album entries.

### 4) Photo post

The `photo-post` collection includes:

- `thumbnail` (required media)
- `photo` (required media)
- `aspect_ratio` (enum: `vertical` or `horizontal`)
- `aperture`
- `focal_length`
- `iso`
- `shutter_speed`
- `location`
- `categories` (many-to-many relation)
- `uid` (unique route identifier)

This supports gallery layouts, image metadata, and media browsing.

## Relationships and taxonomy

The schema uses many-to-many relations between content entries and categories. This makes it easy to:

- filter blog articles by category
- group photo collections by subject
- organize music content by theme or type

## GraphQL impact

Because Strapi includes the GraphQL plugin, the frontend can request structured content such as:

- latest blog entries
- latest music items
- latest photography entries
- specific item pages by UID
- filtered content by category or page context

## Example usage pattern

The frontend queries content from the GraphQL API using queries like:

- `getBlogPosts.gql.js`
- `getBlogPost.gql.js`
- `getMusicPosts.gql.js`
- `getPhotoPosts.gql.js`

These queries return simplified content objects that the React components render into pages and cards.
