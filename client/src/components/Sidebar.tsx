// =============================================================================
// DESIGN SYSTEM: Obsidian-Inspired Knowledge Graph / Minimal Dark
// Sidebar: 260px fixed left nav with collapsible tree, search trigger, branding
// Colors: --sidebar bg, --primary accent, --muted-foreground for inactive items
// =============================================================================

import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { navTree, NavItem } from "@/lib/content";
import { ChevronRight, Search, X } from "lucide-react";

interface SidebarProps {
  onSearchOpen: () => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
}

// Recursively check if any descendant matches the current path
function hasActiveDescendant(item: NavItem, currentPath: string): boolean {
  if (currentPath === item.id || currentPath.startsWith(item.id + '/')) return true;
  return item.children?.some(child => hasActiveDescendant(child, currentPath)) || false;
}

function NavTreeItem({
  item,
  depth = 0,
  onNavigate,
}: {
  item: NavItem;
  depth?: number;
  onNavigate: () => void;
}) {
  const [location, navigate] = useLocation();
  const [expanded, setExpanded] = useState(() => {
    // Auto-expand if current path is under this item (any depth)
    if (!item.children) return false;
    const raw = location.startsWith('/') ? location.slice(1) : location;
    const initPath = raw === "" ? "home" : raw;
    return item.children.some(child => hasActiveDescendant(child, initPath));
  });

  const rawPath = location.startsWith('/') ? location.slice(1) : location;
  const currentPath = rawPath === "" ? "home" : rawPath;
  const isActive = currentPath === item.id;
  const hasChildren = item.children && item.children.length > 0;

  // Check if any descendant is active (recursive)
  const isParentActive = hasChildren && item.children?.some(child =>
    hasActiveDescendant(child, currentPath)
  );
  const paddingLeft = depth === 0 ? "0.5rem" : `${0.5 + depth * 0.875}rem`;

  const handleClick = () => {
    if (hasChildren) {
      setExpanded((e) => !e);
    }
    if (!hasChildren) {
      navigate(`/${item.id}`);
      onNavigate();
    }
  };

  return (
    <div>
      <div
        className={`nav-item ${isActive ? "active" : ""} ${hasChildren ? "nav-dir" : "nav-file"}`}
        style={{ paddingLeft }}
        onClick={handleClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && handleClick()}
      >
        {/* Chevron for expandable items */}
        {hasChildren ? (
          <ChevronRight
            size={12}
            className="shrink-0 transition-transform duration-150"
            style={{
              transform: expanded ? "rotate(90deg)" : "rotate(0deg)",
              color: "var(--muted-foreground)",
            }}
          />
        ) : (
          <span style={{ width: 12, display: "inline-block", flexShrink: 0 }} />
        )}

        <span
          className="truncate"
          style={{
            fontSize: depth === 0 ? "0.82rem" : "0.78rem",
            fontWeight: depth === 0 ? 500 : 400,
          }}
        >
          {item.label}
        </span>
      </div>

      {/* Children */}
      {hasChildren && expanded && (
        <div>
          {item.children!.map((child) => (
            <NavTreeItem
              key={child.id}
              item={child}
              depth={depth + 1}
              onNavigate={onNavigate}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function Sidebar({
  onSearchOpen,
  mobileOpen,
  onMobileClose,
}: SidebarProps) {
  const [, navigate] = useLocation();

  const sidebarContent = (
    <div
      className="flex flex-col h-full"
      style={{
        background: "var(--sidebar)",
        borderRight: "1px solid var(--sidebar-border)",
        width: "290px",
        flexShrink: 0,
      }}
    >
      {/* Branding - hidden on mobile */}
      <div
        className="hidden lg:flex items-center justify-center px-3 py-5"
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        <button
          onClick={() => {
            navigate("/home");
            onMobileClose();
          }}
          className="flex items-center justify-center hover:opacity-80 transition-opacity"
          style={{ background: "none", border: "none", padding: 0, width: "100%" }}
        >
          <img
            src="/halftone_gregory_gu.png"
            alt="Gregory Gu"
            style={{
              height: "44px",
              objectFit: "contain",
              filter: "brightness(0.85)",
            }}
          />
        </button>
      </div>

      {/* Search trigger */}
      <div className="px-2 py-2">
        <button
          onClick={onSearchOpen}
          className="w-full flex items-center gap-2 px-2 py-1.5 rounded text-left transition-all duration-150"
          style={{
            background: "oklch(1 0 0 / 0.04)",
            border: "1px solid var(--border)",
            color: "var(--muted-foreground)",
            fontSize: "0.78rem",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background =
              "oklch(1 0 0 / 0.07)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background =
              "oklch(1 0 0 / 0.04)";
          }}
        >
          <Search size={12} />
          <span>Search</span>
          <span
            className="ml-auto"
            style={{
              fontSize: "0.68rem",
              background: "oklch(1 0 0 / 0.08)",
              padding: "0.1rem 0.35rem",
              borderRadius: "0.2rem",
              border: "1px solid var(--border)",
            }}
          >
            ⌘K
          </span>
        </button>
      </div>

      {/* Navigation tree */}
      <nav className="flex-1 overflow-y-auto px-2 py-1">
        {navTree.map((item) => (
          <NavTreeItem
            key={item.id}
            item={item}
            depth={0}
            onNavigate={onMobileClose}
          />
        ))}
      </nav>

    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex h-screen sticky top-0">
        {sidebarContent}
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <>
          <div
            className="sidebar-overlay md:hidden"
            onClick={onMobileClose}
          />
          <aside
            className="md:hidden fixed left-0 top-0 h-screen z-30 flex"
            style={{ animation: "slideInLeft 150ms ease-out" }}
          >
            {sidebarContent}
          </aside>
        </>
      )}
    </>
  );
}

