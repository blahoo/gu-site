// =============================================================================
// DESIGN SYSTEM: Obsidian-Inspired Knowledge Graph / Minimal Dark
// Search: Full-text fuzzy search modal (⌘K) using Fuse.js
// Appears with scale+fade animation, keyboard navigable
// =============================================================================

import { useState, useEffect, useRef, useCallback } from "react";
import { useLocation } from "wouter";
import Fuse from "fuse.js";
import { getAllPages, type Page } from "@/lib/content";
import { Search, FileText, X } from "lucide-react";

interface SearchResult {
  item: Page;
  score?: number;
}

interface SearchModalProps {
  open: boolean;
  onClose: () => void;
}

let fuse: Fuse<Page> | null = null;
let allPages: Page[] = [];

// Initialize search index
getAllPages().then((pages) => {
  allPages = pages;
  fuse = new Fuse(allPages, {
    keys: [
      { name: "title", weight: 2 },
      { name: "content", weight: 1 },
    ],
    threshold: 0.4,
    includeScore: true,
    minMatchCharLength: 2,
    useExtendedSearch: false,
    ignoreLocation: true,
    distance: 1000,
  });
});

function getExcerpt(content: string, query: string): string {
  const lower = content.toLowerCase();
  const queryLower = query.toLowerCase();
  const idx = lower.indexOf(queryLower);
  if (idx === -1) {
    return content.slice(0, 100).replace(/[#*`]/g, "") + "...";
  }
  const start = Math.max(0, idx - 40);
  const end = Math.min(content.length, idx + query.length + 80);
  const excerpt = content.slice(start, end).replace(/[#*`]/g, "");
  return (start > 0 ? "..." : "") + excerpt + (end < content.length ? "..." : "");
}

export default function SearchModal({ open, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [, navigate] = useLocation();
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setQuery("");
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  // Search when query changes
  useEffect(() => {
    if (!fuse || query.trim().length < 2) {
      setResults([]);
      return;
    }
    const searchResults = fuse.search(query) as SearchResult[];
    setResults(searchResults);
    setSelectedIdx(0);
  }, [query]);

  const handleSelect = useCallback(
    (pageId: string) => {
      navigate(`/${pageId}`);
      onClose();
    },
    [navigate, onClose]
  );

  const handleSelectResult = (result: SearchResult) => {
    handleSelect(result.item.id);
  };

  // Default results when no query
  const defaultResults = (allPages || []).slice(0, 6).map((item) => ({ item }));
  const displayResults = query.trim().length < 2 ? defaultResults : results;

  // Keyboard navigation
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIdx((i) => (i > 0 ? i - 1 : displayResults.length - 1));
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIdx((i) => (i < displayResults.length - 1 ? i + 1 : 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (displayResults[selectedIdx]) {
          handleSelect(displayResults[selectedIdx].item.id);
        }
      } else if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, results, selectedIdx, handleSelect, onClose, displayResults]);

  if (!open) return null;

  return (
    <div className="search-overlay" onClick={onClose}>
      <div
        className="search-modal"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Input */}
        <div
          className="flex items-center gap-2 px-3 py-2.5"
          style={{ borderBottom: "1px solid var(--border)" }}
        >
          <Search size={14} style={{ color: "var(--muted-foreground)", flexShrink: 0 }} />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search pages..."
            className="flex-1 bg-transparent outline-none"
            style={{
              fontSize: "0.875rem",
              color: "var(--foreground)",
              fontFamily: "inherit",
            }}
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              style={{ color: "var(--muted-foreground)" }}
            >
              <X size={12} />
            </button>
          )}
        </div>

        {/* Results */}
        <div style={{ maxHeight: "360px", overflowY: "auto" }}>
          {displayResults.length === 0 && query.trim().length >= 2 ? (
            <div
              className="px-4 py-6 text-center"
              style={{ color: "var(--muted-foreground)", fontSize: "0.82rem" }}
            >
              No results for "{query}"
            </div>
          ) : (
            <div className="py-1">
              {query.trim().length < 2 && (
                <div
                  className="px-3 py-1.5"
                  style={{
                    fontSize: "0.68rem",
                    color: "var(--muted-foreground)",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    fontWeight: 600,
                  }}
                >
                  All Pages
                </div>
              )}
              {displayResults.map((result: SearchResult, idx: number) => (
                <button
                  key={result.item.id}
                  onClick={() => handleSelect(result.item.id)}
                  onMouseEnter={() => setSelectedIdx(idx)}
                  className="w-full text-left px-3 py-2 flex items-start gap-2.5 transition-colors duration-75"
                  style={{
                    background:
                      idx === selectedIdx ? "var(--accent)" : "transparent",
                  }}
                >
                  <FileText
                    size={12}
                    style={{
                      color: "var(--muted-foreground)",
                      marginTop: "0.125rem",
                      flexShrink: 0,
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm text-foreground">
                      {result.item.title}
                    </div>
                    <div className="text-xs text-muted-foreground line-clamp-1">
                      {getExcerpt(result.item.content, query)}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          className="text-xs px-3 py-2"
          style={{
            borderTop: "1px solid var(--border)",
            color: "var(--muted-foreground)",
            display: "flex",
            gap: "1rem",
            justifyContent: "flex-end",
          }}
        >
          <span>↑↓ navigate</span>
          <span>⏎ select</span>
          <span>esc close</span>
        </div>
      </div>
    </div>
  );
}
