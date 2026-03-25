// Content is loaded from markdown files in /content/ at build time.
// The folder structure drives the navigation tree automatically.
// Supports arbitrary nesting depth.

import fm from "front-matter";

export interface NavItem {
  id: string;
  label: string;
  children?: NavItem[];
}

export interface Page {
  id: string;
  title: string;
  content: string;
}

// --- Glob import all markdown files from /content/ ---
const markdownModules = import.meta.glob("../../../content/**/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

// --- Parsed page with metadata ---
interface ParsedPage extends Page {
  label: string;
  order: number;
  nav: boolean;
}

// --- Parse all markdown files ---
const parsedPagesRecord: Record<string, ParsedPage> = {};

for (const [filePath, raw] of Object.entries(markdownModules)) {
  const pageId = filePath
    .replace(/^.*\/content\//, "")
    .replace(/\.md$/, "");

  const { attributes, body } = fm<{
    title?: string;
    label?: string;
    order?: number;
    nav?: boolean;
  }>(raw);

  const filename = pageId.split("/").pop() || pageId;

  parsedPagesRecord[pageId] = {
    id: pageId,
    title: attributes.title || filename,
    content: body.trim(),
    label: attributes.label || attributes.title || filename,
    order: typeof attributes.order === "number" ? attributes.order : -1,
    nav: attributes.nav !== false,
  };
}

// --- Build pages record ---
const pages: Record<string, Page> = {};
for (const [id, parsed] of Object.entries(parsedPagesRecord)) {
  pages[id] = { id: parsed.id, title: parsed.title, content: parsed.content };
}

// --- Sort comparator ---
// order < 0 (incl. unset default -1) = lowest priority (last)
// order >= 0: ascending (0 = highest priority, then 1, 2, 3...)
// Within same priority: alphabetical by label
function compareByOrder(
  aOrder: number,
  aLabel: string,
  bOrder: number,
  bLabel: string,
): number {
  const aPriority = aOrder < 0 ? Infinity : aOrder;
  const bPriority = bOrder < 0 ? Infinity : bOrder;
  if (aPriority !== bPriority) return aPriority - bPriority;
  return aLabel.localeCompare(bLabel);
}

// --- Build nav tree recursively from folder structure ---
// basePath: "" for root, "notes" for notes/, "notes/systems" for notes/systems/, etc.
function buildTreeLevel(basePath: string): NavItem[] {
  const baseDepth = basePath === "" ? 0 : basePath.split("/").length;

  const leafPages: ParsedPage[] = [];
  const subdirSet: Record<string, boolean> = {};
  const indexPageFor: Record<string, ParsedPage> = {};

  for (const [pageId, parsed] of Object.entries(parsedPagesRecord)) {
    // Filter to pages under basePath
    if (basePath === "") {
      // Root level
      const parts = pageId.split("/");
      if (parts.length === 1) {
        // Top-level file like "home"
        if (parsed.nav) leafPages.push(parsed);
      } else {
        // Register the top-level directory
        subdirSet[parts[0]] = true;
      }
    } else {
      if (!pageId.startsWith(basePath + "/")) continue;
      const relativePath = pageId.slice(basePath.length + 1);
      const parts = relativePath.split("/");

      if (parts.length === 1) {
        // Direct child file in this directory
        const filename = parts[0];
        if (filename === "index" || filename === "overview") {
          // Index page for this directory — used for label/order
          indexPageFor[basePath] = parsed;
        } else if (parsed.nav) {
          leafPages.push(parsed);
        }
      } else {
        // Deeper file — register the immediate subdirectory
        subdirSet[basePath + "/" + parts[0]] = true;
      }
    }
  }

  // Also find index pages for subdirs (needed for label/order before recursing)
  for (const subdirPath of Object.keys(subdirSet)) {
    const indexId = subdirPath + "/index";
    const overviewId = subdirPath + "/overview";
    if (parsedPagesRecord[indexId]) {
      indexPageFor[subdirPath] = parsedPagesRecord[indexId];
    } else if (parsedPagesRecord[overviewId]) {
      indexPageFor[subdirPath] = parsedPagesRecord[overviewId];
    }
  }

  const result: { item: NavItem; order: number }[] = [];

  // Add leaf pages
  for (const page of leafPages) {
    result.push({
      item: { id: page.id, label: page.label },
      order: page.order,
    });
  }

  // Add subdirectories with recursive children
  for (const subdirPath of Object.keys(subdirSet)) {
    const indexPage = indexPageFor[subdirPath];
    const children = buildTreeLevel(subdirPath);

    // Prepend index/overview as first child if it should be visible in nav
    if (indexPage && indexPage.nav) {
      children.unshift({ id: indexPage.id, label: indexPage.label });
    }

    // Skip empty folders (no visible children)
    if (children.length === 0) continue;

    const dirName = subdirPath.split("/").pop() || subdirPath;
    const folderLabel =
      indexPage?.label === "Overview" || indexPage?.label === indexPage?.title
        ? indexPage?.title || dirName.charAt(0).toUpperCase() + dirName.slice(1)
        : indexPage?.label || dirName.charAt(0).toUpperCase() + dirName.slice(1);

    result.push({
      item: {
        id: subdirPath,
        label: folderLabel,
        children,
      },
      order: indexPage?.order ?? -1,
    });
  }

  // Sort by order rules
  result.sort((a, b) =>
    compareByOrder(a.order, a.item.label, b.order, b.item.label),
  );

  return result.map((r) => r.item);
}

export const navTree: NavItem[] = buildTreeLevel("");

// Resolve a directory path to its index/overview page ID (if one exists)
export function resolveDirectoryPage(dirPath: string): string | null {
  const indexId = dirPath + "/index";
  const overviewId = dirPath + "/overview";
  if (pages[indexId]) return indexId;
  if (pages[overviewId]) return overviewId;
  return null;
}

// Load a page by ID
export async function loadPage(pageId: string): Promise<Page> {
  return (
    pages[pageId] || {
      id: "__404__",
      title: "Page Not Found",
      content: `# Page Not Found\n\nThe page \`${pageId}\` doesn't exist yet.`,
    }
  );
}

// Get all pages for search
export async function getAllPages(): Promise<Page[]> {
  return Object.values(pages);
}
