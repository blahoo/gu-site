# Gregory Gu's Personal Portfolio

A clean, minimal personal portfolio and knowledge repository built with React, TypeScript, and Tailwind CSS. Features a 3-column layout (left sidebar nav, center content, right contact section) with dark theme, markdown rendering, and fuzzy search.

## Features

- **Markdown-based content** — All pages stored as markdown files in `/content` folder
- **3-column layout** — Left sidebar navigation, centered content, fixed right contact section
- **Dark theme** — Obsidian-inspired design with periwinkle blue (#4468F5) accents
- **Responsive design** — Desktop 3-column layout, mobile with hamburger menu
- **Fuzzy search** — Search across all pages with ⌘K / Ctrl+K
- **Syntax highlighting** — Code blocks with language-specific highlighting
- **Easy to customize** — Simple markdown files, no database required

## Quick Start

### Prerequisites

- Node.js 18+ and npm/pnpm

### Installation

```bash
# Install dependencies
npm install
# or
pnpm install
```

### Development

```bash
npm run dev
# or
pnpm dev
```

The dev server will start at `http://localhost:3000`. Open this URL in your browser.

### Build for Production

```bash
npm run build
# or
pnpm build
```

### Preview Production Build

```bash
npm run preview
# or
pnpm preview
```

## Project Structure

```
portfolio/
├── client/                 # React frontend
│   ├── public/            # Static files (favicon, robots.txt)
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── lib/           # Utilities and content loader
│   │   ├── App.tsx        # Main app with routing
│   │   ├── main.tsx       # React entry point
│   │   └── index.css      # Global styles and theme
│   └── index.html         # HTML template
├── content/               # Markdown content files
│   ├── home.md
│   ├── about/
│   ├── projects/
│   ├── experience/
│   ├── notes/
│   └── contact/
├── package.json
├── vite.config.ts
└── tsconfig.json
```

## Customization

### Update Personal Information

Edit the markdown files in `/content` folder:

- **Home page:** `content/home.md`
- **About:** `content/about/index.md`
- **Projects:** `content/projects/*.md`
- **Experience:** `content/experience/*.md`
- **Notes:** `content/notes/*.md`
- **Contact:** `content/contact/index.md`

### Update Contact Links

Edit `client/src/components/ContactSection.tsx` to update:
- Email address
- GitHub profile URL
- LinkedIn profile URL

### Change Accent Color

Edit `client/src/index.css` and update the `--primary` color variable (currently `#4468F5`).

### Change Fonts

Edit `client/index.html` to update Google Fonts import, then update `client/src/index.css` font-family references.

## Technologies

- **React 19** — UI framework
- **TypeScript** — Type safety
- **Tailwind CSS 4** — Utility-first styling
- **Wouter** — Lightweight client-side routing
- **React Markdown** — Markdown rendering
- **Rehype Highlight** — Code syntax highlighting
- **Fuse.js** — Fuzzy search
- **Vite** — Fast build tool and dev server

## Scripts

- `npm run dev` — Start development server
- `npm run build` — Build for production
- `npm run preview` — Preview production build
- `npm run check` — Run TypeScript type checking
- `npm run format` — Format code with Prettier

## License

MIT
