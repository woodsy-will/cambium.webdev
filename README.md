# Cambium Arbor (Eleventy Migration)

A static busines site for Cambium Arbor (formerly Steinley Forestry), migrated from HTML/CSS to Eleventy (11ty).

## Features

- **Static Native:** Built with Eleventy for high performance and zero client-side dependencies (except Leaflet/Decap).
- **Pico.css Framework:** Preserved semantic HTML classless design.
- **Leaflet.js Map:** Interactive service area map on the homepage.
- **Decap CMS:** Manage "News" posts via a git-based CMS (`/admin`).
- **Fire Insurance Landing Page:** Dedicated landing page for lead generation.

## Project Structure

```
src/
├── _includes/      # Layouts (base.njk, post.njk)
├── admin/          # Decap CMS config and entry point
├── assets/         # Images, PDFs
├── css/            # Custom styles
├── js/             # Main frontend logic (Map, Forms)
├── news/           # Blog posts (Markdown)
├── about.njk       # About page
├── fire-insurance.njk # Specific landing page
└── index.njk       # Home page
```

## Getting Started

### Prerequisites

- Node.js (v14+)

### Installation

```bash
npm install
```

### Local Development

Start the local server with hot-reload:

```bash
npm start
```

Access the site at `http://localhost:8080`.
Access the CMS at `http://localhost:8080/admin`.

### Build for Production

Generate the static output in `public/`:

```bash
npm run build
```

## Deployment

This project is configured for **Cloudflare Pages**.

- **Build command:** `npx @11ty/eleventy`
- **Build output directory:** `public`
