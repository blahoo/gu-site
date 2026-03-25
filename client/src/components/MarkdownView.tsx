// =============================================================================
// DESIGN SYSTEM: Obsidian-Inspired Knowledge Graph / Minimal Dark
// MarkdownView: Renders markdown content with syntax highlighting
// Max-width: 740px, centered in content area, page-enter animation
// =============================================================================

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { useLocation } from "wouter";
import { loadPage, resolveDirectoryPage, type Page } from "@/lib/content";
import { useEffect, useRef, useState } from "react";
import { ExternalLink } from "lucide-react";

interface MarkdownViewProps {
  pageId: string;
}

// Custom link renderer — internal links use wouter, external open in new tab
function CustomLink({
  href,
  children,
}: {
  href?: string;
  children?: React.ReactNode;
}) {
  const [, navigate] = useLocation();

  if (!href) return <span>{children}</span>;

  // Internal link
  if (href.startsWith("/")) {
    return (
      <a
        href={href}
        onClick={(e) => {
          e.preventDefault();
          navigate(href);
        }}
        style={{ color: "var(--primary)", cursor: "pointer" }}
      >
        {children}
      </a>
    );
  }

  // External link
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
      <ExternalLink
        size={10}
        className="inline-block ml-0.5 mb-0.5"
        style={{ opacity: 0.6 }}
      />
    </a>
  );
}

export default function MarkdownView({ pageId }: MarkdownViewProps) {
  const [, navigate] = useLocation();
  const [page, setPage] = useState<Page | null>(null);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  // Load page on mount or when pageId changes
  useEffect(() => {
    setLoading(true);
    loadPage(pageId).then((p) => {
      setPage(p);
      setLoading(false);
    });
  }, [pageId]);

  // Scroll to top on page change
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
    window.scrollTo(0, 0);
  }, [pageId]);

  if (loading || !page) {
    return (
      <div
        className="page-enter"
        style={{
          maxWidth: "740px",
          margin: "0 auto",
          padding: "2rem 1rem",
          color: "var(--muted-foreground)",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        Loading...
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="page-enter"
      style={{
        maxWidth: "740px",
        margin: "0 auto",
        padding: "2rem 1rem",
        fontSize: "0.95rem",
        lineHeight: 1.7,
        color: "var(--foreground)",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      {/* File path breadcrumb */}
      <div
        style={{
          fontSize: "0.84rem",
          color: "var(--muted-foreground)",
          opacity: 0.6,
          marginBottom: "0.25rem",
        }}
      >
        {(() => {
          const segments = page.id.split("/");
          // Prepend "home" and deduplicate if page.id is already "home"
          const allSegments = page.id === "home" ? ["home"] : ["home", ...segments];
          return allSegments.map((segment, i) => {
            const isLast = i === allSegments.length - 1;
            // "home" links to /home; directory segments resolve to their index/overview page
            // Last segment links to itself (current page)
            let path: string;
            if (isLast) {
              path = `/${page.id}`;
            } else if (i === 0) {
              path = "/home";
            } else {
              const dirPath = segments.slice(0, i).join("/");
              const resolved = resolveDirectoryPage(dirPath);
              path = resolved ? `/${resolved}` : `/${dirPath}`;
            }
            return (
              <span key={i}>
                {i > 0 && " / "}
                <a
                  href={path}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(path);
                  }}
                  style={{
                    color: "inherit",
                    textDecoration: "none",
                    cursor: "pointer",
                    transition: "color 150ms ease, opacity 150ms ease",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "var(--primary)";
                    (e.currentTarget as HTMLElement).style.textDecoration = "underline";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "inherit";
                    (e.currentTarget as HTMLElement).style.textDecoration = "none";
                  }}
                >
                  {segment}
                </a>
              </span>
            );
          });
        })()}
      </div>

      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          a: CustomLink,
          h1: ({ children }) => (
            <h1 style={{ marginTop: "0.5rem", marginBottom: "1rem", fontSize: "2rem", fontWeight: 600 }}>
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 style={{ marginTop: "1.5rem", marginBottom: "0.75rem", fontSize: "1.5rem", fontWeight: 600 }}>
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 style={{ marginTop: "1.25rem", marginBottom: "0.5rem", fontSize: "1.1rem", fontWeight: 600 }}>
              {children}
            </h3>
          ),
          p: ({ children }) => (
            <p style={{ marginBottom: "1rem" }}>
              {children}
            </p>
          ),
          ul: ({ children }) => (
            <ul style={{ marginLeft: "1.5rem", marginBottom: "1rem", listStyle: "disc" }}>
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol style={{ marginLeft: "1.5rem", marginBottom: "1rem", listStyle: "decimal" }}>
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li style={{ marginBottom: "0.25rem" }}>
              {children}
            </li>
          ),          code: ({ children, className }: any) => {
            const inline = !className?.includes('language-');
            return (
              <code
                style={{
                  fontFamily: "'Roboto Mono', monospace",
                  fontSize: inline ? "0.85em" : "0.9em",
                  backgroundColor: inline ? "oklch(1 0 0 / 0.06)" : "transparent",
                  padding: inline ? "0.2em 0.4em" : "0",
                  borderRadius: inline ? "0.25rem" : "0",
                  color: inline ? "var(--foreground)" : "inherit",
                }}
              >
                {children}
              </code>
            );
          },         pre: ({ children }) => (
            <pre
              style={{
                backgroundColor: "oklch(0.15 0.01 265)",
                padding: "1rem",
                borderRadius: "0.5rem",
                overflowX: "auto",
                marginBottom: "1rem",
                fontSize: "0.85rem",
                lineHeight: 1.5,
              }}
            >
              {children}
            </pre>
          ),
          blockquote: ({ children }) => (
            <blockquote
              style={{
                borderLeft: "3px solid var(--primary)",
                paddingLeft: "1rem",
                marginLeft: 0,
                marginBottom: "1rem",
                color: "var(--muted-foreground)",
                fontStyle: "italic",
              }}
            >
              {children}
            </blockquote>
          ),
          table: ({ children }: any) => (
            <div style={{ overflowX: "auto", marginBottom: "1rem" }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: "0.9rem",
                }}
              >
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead style={{ borderBottom: "2px solid var(--border)" }}>
              {children}
            </thead>
          ),
          th: ({ children }) => (
            <th
              style={{
                padding: "0.5rem",
                textAlign: "left",
                fontWeight: 600,
                color: "var(--foreground)",
              }}
            >
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td
              style={{
                padding: "0.5rem",
                borderBottom: "1px solid var(--border)",
                color: "var(--foreground)",
              }}
            >
              {children}
            </td>
          ),
        }}
      >
        {page.content}
      </ReactMarkdown>

      {/* Page footer */}
      <div
        style={{
          marginTop: "4rem",
          paddingTop: "1.5rem",
          borderTop: "1px solid var(--border)",
          fontSize: "0.72rem",
          color: "var(--muted-foreground)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <span style={{ opacity: 0.5 }}>gregorygu.com</span>
      </div>
    </div>
  );
}
