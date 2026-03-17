# Project Design Document

Gregory Gu — Personal Knowledge Repository

---

## 1. Overview

This is a static-first personal portfolio and knowledge repository built with **React + Vite + TypeScript**. All site content is driven by markdown files in the `/content/` directory. The folder structure dictates navigation, and YAML frontmatter controls ordering, labels, and visibility.

### Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 (SPA) |
| Bundler | Vite 5 |
| Language | TypeScript (strict) |
| Routing | Wouter (lightweight client-side router) |
| Markdown | react-markdown + remark-gfm + rehype-highlight |
| Frontmatter | front-matter (npm) |
| Styling | Tailwind CSS v4 + inline styles |
| Search | Fuse.js (fuzzy full-text, client-side) |
| Code Highlighting | highlight.js (GitHub Dark theme) |
| Fonts | Google Fonts (Roboto, Roboto Mono) |

---

## 2. Design System

### 2.1 Philosophy

> Obsidian-inspired knowledge graph / minimal dark. The interface disappears — only content remains.

The design prioritizes readability and content density. No gratuitous decoration, no light mode, no visual noise.

### 2.2 Color Palette

All colors use the `oklch` color space for perceptual uniformity.

| Token | Value | Usage |
|-------|-------|-------|
| `--background` | `oklch(0.095 0.002 240)` | Page background (~#0d0d0d) |
| `--foreground` | `oklch(0.86 0.004 240)` | Primary text (~#dcddde) |
| `--sidebar` | `oklch(0.11 0.002 240)` | Sidebar background (~#141414) |
| `--primary` | `#4468F5` | Accent blue — links, active states |
| `--muted-foreground` | `oklch(0.52 0.008 240)` | Secondary text, nav labels (~#72767d) |
| `--border` | `oklch(1 0 0 / 0.06)` | Subtle borders (~rgba(255,255,255,0.06)) |
| `--nav-hover-bg` | `oklch(1 0 0 / 0.05)` | Nav item hover fill |
| `--nav-active-bg` | `oklch(1 0 0 / 0.09)` | Nav item active fill |
| `--nav-active-border` | `#4468F5` | Active nav left-border accent |

### 2.3 Typography

| Element | Font | Size | Weight | Notes |
|---------|------|------|--------|-------|
| Body text | Roboto | 0.9rem (14.4px) | 400 | line-height: 1.6 |
| Markdown body | Roboto | 0.925rem | 400 | line-height: 1.75 |
| `h1` | Roboto | 1.75rem (28px) | 600 | letter-spacing: -0.02em |
| `h2` | Roboto | 1.25rem (20px) | 600 | letter-spacing: -0.01em, bottom border |
| `h3` | Roboto | 1rem (16px) | 600 | |
| `h4` | Roboto | 0.9rem (14.4px) | 600 | |
| Code / `pre` | Roboto Mono | 0.82rem | 400 | GitHub Dark highlight theme |
| Inline code | Roboto Mono | 0.82rem | 400 | Blue-tinted: `oklch(0.78 0.12 265)` |
| Nav items (depth 0) | Roboto | 0.82rem | 500 | |
| Nav items (nested) | Roboto | 0.78rem | 400 | |
| Table headers | Roboto | 0.8rem | 600 | Uppercase, letter-spacing: 0.04em |
| Sidebar branding | — | — | — | Halftone image, 22px height |
| Mobile topbar | — | — | — | Halftone image, 20px height |

### 2.4 Layout

```
Desktop (lg+):
+--260px--+--------flex 1--------+--320px--+
| Sidebar |    Main Content      | Contact |
| (fixed) |  (max-width: 740px)  | (fixed) |
|         |    centered          |         |
+---------+----------------------+---------+

Mobile (<lg):
+--sticky topbar (60px)--+
| [hamburger]  [logo]    |
+------------------------+
|    Main Content        |
| (full width, padded)   |
+------------------------+
  Sidebar: slide-in overlay from left (260px)
```

| Dimension | Value |
|-----------|-------|
| Sidebar width | 260px |
| Right sidebar width | 320px |
| Content max-width | 740px |
| Mobile header height | 60px |
| Border radius (default) | 0.375rem |

### 2.5 Interactions

| Interaction | Duration | Easing |
|-------------|----------|--------|
| Nav hover/active transitions | 150ms | ease |
| Search modal entrance | 120ms | ease-out |
| Page content entrance | 120ms | ease-out (opacity) |
| Mobile sidebar slide-in | 150ms | ease-out |
| Link hover | 150ms | ease |

### 2.6 Scrollbar

Custom styled (WebKit):
- Width: 6px
- Track: transparent
- Thumb: `oklch(1 0 0 / 0.12)`, 3px radius
- Thumb hover: `oklch(1 0 0 / 0.2)`

### 2.7 Branding Assets

| Asset | Location | Usage |
|-------|----------|-------|
| `favicon.ico` | `client/public/favicon.ico` | Browser tab icon (GG halftone) |
| `halftone_gregory_gu.png` | `client/public/halftone_gregory_gu.png` | Sidebar + mobile topbar title |
| `halftone_gu_white.png` | `client/public/halftone_gu_white.png` | Right sidebar portrait image |

---

## 3. Content System

### 3.1 How It Works

All content lives in the `/content/` directory at the project root. At build time, Vite's `import.meta.glob` discovers every `.md` file recursively. Each file is parsed for YAML frontmatter (metadata) and markdown body (content). The folder structure automatically generates the sidebar navigation tree.

**There is no database, no CMS, no API.** You edit markdown files and the site rebuilds.

### 3.2 Frontmatter Schema

Every `.md` file should begin with a YAML frontmatter block:

```yaml
---
title: "Page Title"       # REQUIRED — shown as the page heading
label: "Nav Label"         # optional — sidebar label (defaults to title)
order: 0                   # optional — sort priority (defaults to -1)
nav: true                  # optional — show in sidebar (defaults to true)
---

Your markdown content goes here...
```

#### Field Reference

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `title` | string | filename | Page heading and document title. **Always set this.** |
| `label` | string | title | The text shown in the sidebar navigation. Use this when you want a shorter sidebar label than the full title (e.g., title: "About Me", label: "About Me" — or title: "Experience", label: "Overview" for an index page). |
| `order` | number | -1 | Controls sort position within its directory. See ordering rules below. |
| `nav` | boolean | true | If `false`, the page is accessible by URL but hidden from the sidebar. Useful for `index.md` files that only exist to set folder metadata. |

### 3.3 Ordering Rules

Pages and folders within the same directory are sorted by `order`:

| Order Value | Behavior |
|-------------|----------|
| `order: 0` | **Highest priority** — appears first |
| `order: 1, 2, 3...` | Ascending priority — appears in numerical order |
| `order: -1` (or unset) | **Lowest priority** — appears last |

**Tiebreaking:** When two items have the same effective priority, they are sorted **alphabetically by label**.

**Gaps are fine:** You can use `order: 0, 5, 10` — the system only cares about relative precedence, not contiguous numbering.

#### Examples

```
content/
  home.md          (order: 0)  → appears 1st
  about/index.md   (order: 1)  → appears 2nd
  projects/        (order: 3)  → appears 3rd (set via overview.md)
  experience/      (order: 3)  → appears 3rd (tie with projects, "Experience" < "Projects" alphabetically)
  notes/           (order: 4)  → appears 4th
  contact/         (order: -1) → appears last
```

### 3.4 File & Folder Conventions

#### Leaf Pages

Any `.md` file that is NOT named `index.md` or `overview.md` is a **leaf page**. It renders as a clickable item in the sidebar.

```
content/notes/systems.md → appears as "Systems Programming" in Notes
```

#### Index / Overview Files

Files named `index.md` or `overview.md` serve a special purpose — they provide **metadata for their parent folder**:

- **`label`**: Sets the folder's display name in the sidebar
- **`order`**: Sets the folder's sort position among its siblings
- **`nav: false`**: Hides the index page itself from the sidebar children (folder still appears as a collapsible group)
- **`nav: true`** (default): The index page appears as the first child item under the folder (useful for "Overview" pages)

| Pattern | Folder label source | Index visible in nav? |
|---------|--------------------|-----------------------|
| `index.md` with `nav: false` | Uses `title` or `label` from frontmatter | No — folder acts as a pure grouping container |
| `index.md` with `nav: true` | Uses `title` from frontmatter | Yes — appears as first child (e.g., "Overview") |
| `overview.md` with `nav: true` | Uses `title` from frontmatter | Yes — appears as first child (e.g., "Overview") |
| No index file | Auto-capitalizes directory name | N/A |

### 3.5 Nesting (Arbitrary Depth)

The system supports **arbitrary nesting depth**. Create subdirectories to subcategorize content:

```
content/
  notes/
    index.md              ← folder metadata (label: "Notes", order: 4, nav: false)
    systems.md            ← leaf page
    algorithms.md         ← leaf page
    cyber/
      index.md            ← folder metadata (label: "Cybersecurity", order: 0, nav: false)
      network-security.md ← leaf page
      web-security.md     ← leaf page
      blackhat/
        index.md          ← folder metadata (label: "Blackhat", order: 3, nav: false)
        reconnaissance.md ← leaf page (order: 0 → appears first)
        exploitation.md   ← leaf page (order: 1 → appears second)
```

This produces the nav tree:

```
Notes
  ▸ Cybersecurity
      Network Security
      Web Security
      ▸ Blackhat
          Reconnaissance
          Exploitation
  Algorithms & DS
  Machine Learning
  Systems Programming
  Tools & Workflow
```

### 3.6 URL Routing

URLs map directly to page IDs (which are derived from file paths):

| File Path | Page ID | URL |
|-----------|---------|-----|
| `content/home.md` | `home` | `/home` or `/` |
| `content/about/index.md` | `about/index` | `/about/index` |
| `content/notes/systems.md` | `notes/systems` | `/notes/systems` |
| `content/notes/cyber/blackhat/exploitation.md` | `notes/cyber/blackhat/exploitation` | `/notes/cyber/blackhat/exploitation` |

The root URL `/` automatically loads `home`.

### 3.7 Markdown Features

The renderer supports all standard markdown plus:

- **GitHub Flavored Markdown (GFM)**: tables, strikethrough, task lists, autolinks
- **Syntax-highlighted code blocks**: Use fenced code blocks with a language identifier
- **Internal links**: Use absolute paths like `[link text](/notes/systems)`
- **Images**: `![alt](url)` — images get rounded corners and a subtle border
- **Blockquotes**: Left-bordered with the accent blue
- **Tables**: Styled with hover rows and uppercase headers

#### Code Block Example

````markdown
```python
def hello():
    print("Hello, world!")
```
````

#### Table Example

```markdown
| Column A | Column B |
|----------|----------|
| Value 1  | Value 2  |
```

#### Internal Link Example

```markdown
See [my projects](/projects/overview) for more details.
```

---

## 4. How to Add Content

### 4.1 Adding a New Top-Level Page

1. Create a `.md` file directly in `/content/`:
   ```
   content/new-page.md
   ```
2. Add frontmatter:
   ```yaml
   ---
   title: "My New Page"
   order: 5
   ---
   ```
3. The page appears in the sidebar at the root level, sorted by its `order` value.

### 4.2 Adding a New Category (Folder)

1. Create a directory under `/content/`:
   ```
   content/tutorials/
   ```
2. Create an `index.md` inside it for metadata:
   ```yaml
   ---
   title: "Tutorials"
   order: 5
   nav: false
   ---
   ```
3. Add content pages inside:
   ```
   content/tutorials/getting-started.md
   content/tutorials/advanced-topics.md
   ```
4. The folder appears as a collapsible group in the sidebar.

### 4.3 Adding a Subcategory (Nested Folder)

1. Create a subdirectory:
   ```
   content/tutorials/react/
   ```
2. Add an `index.md`:
   ```yaml
   ---
   title: "React Tutorials"
   label: "React"
   order: 0
   nav: false
   ---
   ```
3. Add pages:
   ```
   content/tutorials/react/hooks.md
   content/tutorials/react/state-management.md
   ```
4. "React" appears as a nested collapsible group under "Tutorials".

### 4.4 Adding an Overview Page to a Folder

If you want a visible "Overview" page as the first item in a folder:

```yaml
---
title: "Projects"
label: "Overview"
order: 3
nav: true          # <-- this makes it visible as a child
---
```

This creates an "Overview" link as the first child under the "Projects" folder.

### 4.5 Hiding a Page from Navigation

Set `nav: false` in frontmatter. The page is still accessible via direct URL but won't appear in the sidebar:

```yaml
---
title: "Draft Post"
nav: false
---
```

---

## 5. Project Structure

```
gu-site-v2/
├── content/                      # ALL site content lives here
│   ├── home.md                   # Landing page (order: 0)
│   ├── about/
│   │   └── index.md
│   ├── projects/
│   │   ├── overview.md           # Folder index (nav: true → visible "Overview")
│   │   ├── distributed-kv.md
│   │   └── ...
│   ├── experience/
│   │   ├── overview.md
│   │   └── ...
│   ├── notes/
│   │   ├── index.md              # Folder metadata only (nav: false)
│   │   ├── systems.md
│   │   ├── algorithms.md
│   │   └── cyber/
│   │       ├── index.md
│   │       ├── network-security.md
│   │       └── blackhat/
│   │           ├── index.md
│   │           ├── reconnaissance.md
│   │           └── exploitation.md
│   └── contact/
│       └── index.md
├── client/                       # React application
│   ├── public/                   # Static assets (served as-is)
│   │   ├── favicon.ico
│   │   ├── halftone_gregory_gu.png
│   │   └── halftone_gu_white.png
│   ├── index.html                # Entry HTML (fonts, favicon, title)
│   └── src/
│       ├── main.tsx              # React mount point
│       ├── App.tsx               # Root layout (3-column desktop, mobile topbar)
│       ├── index.css             # Full design system (colors, typography, components)
│       ├── lib/
│       │   └── content.ts        # Content engine (glob → parse → nav tree)
│       ├── components/
│       │   ├── Sidebar.tsx       # Left nav with recursive tree
│       │   ├── MarkdownView.tsx  # Markdown renderer
│       │   ├── SearchModal.tsx   # Cmd+K fuzzy search
│       │   ├── ContactSection.tsx # Right sidebar (contact + portrait)
│       │   └── ErrorBoundary.tsx
│       └── contexts/
│           └── ThemeContext.tsx   # Dark theme provider
├── vite.config.ts                # Vite config (fs.allow for /content/)
├── tsconfig.json
├── tailwind.config.ts
└── package.json
```

---

## 6. Key Source Files

### `client/src/lib/content.ts`

The content engine. This file:
1. Glob-imports all `.md` files from `/content/` at build time
2. Parses YAML frontmatter from each file
3. Builds a recursive `NavItem[]` tree from the folder structure
4. Exports `navTree`, `loadPage()`, and `getAllPages()` consumed by all components

No other file needs to understand the content system. The public API is:

```typescript
// Navigation tree for the sidebar
export const navTree: NavItem[];

// Load a single page by its ID (e.g., "notes/systems")
export async function loadPage(pageId: string): Promise<Page>;

// Get all pages for search indexing
export async function getAllPages(): Promise<Page[]>;
```

### `client/src/index.css`

The complete design system in one file. Contains:
- CSS custom properties (color tokens, spacing, transitions)
- Tailwind v4 integration (`@import "tailwindcss"`)
- All component styles: nav items, markdown body, search modal, code blocks, tables, tags, scrollbars

### `client/src/App.tsx`

Root layout component. Manages:
- 3-column desktop layout (sidebar / content / contact)
- Mobile responsive topbar with hamburger menu
- Slide-in mobile sidebar overlay
- Cmd+K search keyboard shortcut
- Wouter route matching

---

## 7. Development

### Prerequisites

- Node.js 18+
- npm

### Commands

```bash
npm install          # Install dependencies
npm run dev          # Start dev server (localhost:3000)
npm run build        # Production build
npm run preview      # Preview production build
```

### HMR / Hot Reload

Vite watches all files matched by `import.meta.glob`. When you edit a markdown file in `/content/`, the dev server hot-reloads automatically.

### Adding New Dependencies

The content system depends on:
- `front-matter` — YAML frontmatter parsing
- `react-markdown` — Markdown-to-React rendering
- `remark-gfm` — GitHub Flavored Markdown support
- `rehype-highlight` — Code syntax highlighting
- `fuse.js` — Client-side fuzzy search

---

## 8. Quick Reference

### Frontmatter Cheatsheet

```yaml
# Minimal page
---
title: "My Page"
---

# Fully specified page
---
title: "My Detailed Page"
label: "Short Label"
order: 2
nav: true
---

# Folder metadata (hidden from nav)
---
title: "Category Name"
order: 3
nav: false
---

# Overview page (visible as first child)
---
title: "Section Name"
label: "Overview"
order: 3
nav: true
---
```

### Ordering Quick Reference

| Want this position? | Set this |
|--------------------|----------|
| First in section | `order: 0` |
| Second | `order: 1` |
| Somewhere in the middle | `order: 2-99` |
| Last (default) | `order: -1` or omit |

### Naming Conventions

| Convention | Example | Purpose |
|-----------|---------|---------|
| `index.md` | `notes/index.md` | Folder metadata |
| `overview.md` | `projects/overview.md` | Folder metadata (visible "Overview" page) |
| Kebab-case filenames | `network-security.md` | Leaf pages |
| Kebab-case directories | `notes/cyber/blackhat/` | Subcategories |
