# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal blog/portfolio site built with **Astro 5** using the Astro Cactus theme. It's a static site generator with TypeScript, Tailwind CSS v4, and MDX support.

## Commands

```bash
npm run dev        # Start dev server at localhost:3000
npm run build      # Production build to ./dist/
npm run postbuild  # Generate Pagefind search index (run after build)
npm run check      # Type check + Biome linting
npm run lint       # Auto-fix with Biome
npm run format     # Prettier formatting
```

For local preview with search working: `npm run build && npm run postbuild && npm run preview`

## Architecture

### Content System
- **Posts**: `src/content/post/*.md(x)` - Blog posts with frontmatter (title, description, publishDate required; tags, coverImage, draft, pinned optional)
- **Notes**: `src/content/note/*.md(x)` - Quick notes (title, publishDate required)
- **Tags**: `src/content/tag/*.md(x)` - Optional tag page overrides (filename must match a tag used in posts)

Content schemas are defined in `src/content.config.ts` with Zod validation.

### Key Directories
- `src/pages/` - File-based routing (Astro pages)
- `src/layouts/` - Page templates (`Base.astro`, `BlogPost.astro`)
- `src/components/` - Reusable components (organized by feature: `blog/`, `layout/`, `note/`)
- `src/data/post.ts` - Post filtering, grouping, and tag utilities
- `src/plugins/` - Custom Remark plugins (admonitions, GitHub cards, reading time)
- `src/styles/` - Global CSS with Tailwind and theme variables

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
- Biome for linting (tabs, semicolons, trailing commas)
- Prettier for Astro/markdown formatting
