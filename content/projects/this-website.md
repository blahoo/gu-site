---
title: "This Website"
order: 
---

WIP (ai slop rn)

# This Website

A personal knowledge repository and portfolio, built as a markdown-first single-page application. The entire content is stored in plain markdown files organized in a folder structure.

## Design Philosophy

**Simplicity over features.** The site is intentionally minimal — no database, no backend, no JavaScript framework complexity. Just markdown files, React for routing, and Tailwind for styling.

The left sidebar mirrors the folder structure, making it easy to add new pages: just drop a `.md` file in the right folder and it automatically appears in the nav.

## Tech Stack

- **React 19** — client-side routing with Wouter
- **Markdown rendering** — react-markdown with syntax highlighting
- **Styling** — Tailwind CSS 4 with custom dark theme
- **Search** — Fuse.js for fuzzy full-text search
- **Deployment** — Static site hosting

## Key Features

- **Markdown-based content** — all pages are plain markdown strings
- **Folder-based navigation** — sidebar structure mirrors content organization
- **Fuzzy search** — search across all pages with ⌘K
- **Code highlighting** — syntax highlighting for 100+ languages
- **Dark theme** — Obsidian-inspired dark mode with blue accents
- **Mobile responsive** — collapsible sidebar on small screens

## Lessons Learned

Building a portfolio site taught me the value of constraints. By limiting myself to markdown, I avoided feature creep and shipped something clean and maintainable. The folder structure makes it trivial to add new sections.

**Tags:** `react` `typescript` `tailwind` `markdown` `portfolio`
