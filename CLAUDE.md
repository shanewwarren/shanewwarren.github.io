# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal blog/portfolio site built with **Astro 5** using the Astro Cactus theme. It's a static site generator with TypeScript, Tailwind CSS v4, and MDX support.

## Commands

**Always use `bun` instead of `npm` for all package management and scripts.**

```bash
bun run dev        # Start dev server at localhost:3000
bun run build      # Production build to ./dist/
bun run postbuild  # Generate Pagefind search index (run after build)
bun run check      # Type check + Biome linting
bun run lint       # Auto-fix with Biome
bun run format     # Prettier formatting
bun install        # Install dependencies
bun add <pkg>      # Add a dependency
```

For local preview with search working: `bun run build && bun run postbuild && bun run preview`

## Architecture

### Content System
- **Posts**: `src/content/post/*.md(x)` - Blog posts with frontmatter (title, description, publishDate required; tags, coverImage, draft, pinned optional)
- **Notes**: `src/content/note/*.md(x)` - Quick notes (title, publishDate required)
- **Tags**: `src/content/tag/*.md(x)` - Optional tag page overrides (filename must match a tag used in posts)

Content schemas are defined in `src/content.config.ts` with Zod validation.

### Key Directories
- `src/pages/` - File-based routing (Astro pages)
- `src/layouts/` - Page templates (`Base.astro`, `BlogPost.astro`)
- `src/components/` - Reusable components
  - `src/components/react/` - React components (Header, Footer, Search, ThemeToggle, TOC, etc.)
  - `src/components/blog/` - Blog-specific Astro components (Masthead, webmentions)
  - `src/components/note/` - Note-related components
- `src/data/post.ts` - Post filtering, grouping, and tag utilities
- `src/plugins/` - Custom Remark plugins (admonitions, GitHub cards, reading time)
- `src/styles/` - Global CSS with Tailwind and theme variables

### React Integration
The project uses `@astrojs/react` for interactive components. React components are in `src/components/react/` and use client directives:
- `client:load` - Hydrate immediately (Header, Search, ThemeToggle)
- `client:idle` - Hydrate when idle (TOC)
- Icons use `@iconify/react` instead of `astro-icon`

### Configuration
- `src/site.config.ts` - Site metadata (author, title, URL, menu links, code block themes)
- `astro.config.ts` - Astro integrations, markdown plugins
- `biome.json` - Linting rules

### Theme System
Uses CSS custom properties with `data-theme="light|dark"` attribute switching. Theme variables in `src/styles/global.css`.

### Markdown Features
- Admonition blocks: `::: note`, `::: warning`, `::: tip`, `::: caution`, `::: important`
- GitHub repo cards via custom directive
- Auto-generated reading time
- Syntax highlighting via Expressive Code (Dracula dark, GitHub Light themes)

## Code Style

- TypeScript strict mode with path alias `@/*` for `src/*`
- **Biome** for linting AND formatting (tabs, semicolons, trailing commas, quotes)
- **Prettier** for Tailwind class sorting only (via `prettier-plugin-tailwindcss`)

### Tooling Setup

The project uses a dual-tool approach:
- `npm run lint` - Biome fixes linting issues
- `npm run format` - Biome formats code, then Prettier sorts Tailwind classes
- `npm run check` - Type checking + Biome linting (no auto-fix)
