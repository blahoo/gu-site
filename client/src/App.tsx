// =============================================================================
// DESIGN SYSTEM: Obsidian-Inspired Knowledge Graph / Minimal Dark
// App: Root layout — 3-column on desktop, top header + content on mobile
// Dark theme enforced via ThemeProvider defaultTheme="dark"
// =============================================================================

import { useState, useEffect } from "react";
import { Route, Switch, useLocation } from "wouter";
import { ThemeProvider } from "./contexts/ThemeContext";
import ErrorBoundary from "./components/ErrorBoundary";
import Sidebar from "./components/Sidebar";
import SearchModal from "./components/SearchModal";
import MarkdownView from "./components/MarkdownView";
import ContactSection from "./components/ContactSection";

// Page component that extracts the page ID from the route
// Wouter wildcard: path="/*" -> params["*"] contains everything after /
function PageView({ params }: { params: Record<string, string> }) {
  const pageId = params["*"] || "home";
  return <MarkdownView pageId={pageId} />;
}

function NotFoundPage() {
  return <MarkdownView pageId="__404__" />;
}

type HoverZone = "left" | "center" | "right" | null;

function AppLayout() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [location, navigate] = useLocation();
  const [hoverZone, setHoverZone] = useState<HoverZone>(null);

  // Global keyboard shortcut: ⌘K or Ctrl+K to open search
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Close mobile nav on route change
  useEffect(() => {
    setMobileNavOpen(false);
  }, [location]);

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "var(--background)",
        flexDirection: "column",
      }}
    >
      {/* Mobile Header Bar - visible only on mobile */}
      <div
        style={{
          height: "60px",
          borderBottom: "1px solid var(--border)",
          background: "var(--background)",
          alignItems: "center",
          paddingLeft: "1rem",
          paddingRight: "1rem",
          position: "sticky",
          top: 0,
          zIndex: 40,
        }}
        className="lg:hidden flex justify-between items-center"
      >
        <button
          onClick={() => setMobileNavOpen(!mobileNavOpen)}
          style={{
            background: "none",
            border: "none",
            color: "var(--foreground)",
            cursor: "pointer",
            fontSize: "1.5rem",
            padding: "0.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          aria-label="Toggle menu"
        >
          ☰
        </button>
        <button
          onClick={() => navigate("/")}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
            display: "flex",
            alignItems: "center",
          }}
          aria-label="Go to home"
        >
          <img
            src="/halftone_gregory_gu.png"
            alt="Gregory Gu"
            style={{
              height: "32px",
              objectFit: "contain",
              filter: "brightness(0.85)",
            }}
          />
        </button>
        <div style={{ width: "40px" }} />
      </div>

      {/* Main content container */}
      <div
        style={{
          display: "flex",
          flex: 1,
          minHeight: 0,
        }}
      >
        {/* Left Sidebar - hidden on mobile */}
        <div
          className="hidden lg:block"
          onMouseEnter={() => setHoverZone("left")}
          onMouseLeave={() => setHoverZone(null)}
          style={{
            opacity: hoverZone === "center" ? 0.35 : 1,
            transition: "opacity 300ms ease",
          }}
        >
          <Sidebar
            onSearchOpen={() => setSearchOpen(true)}
            mobileOpen={mobileNavOpen}
            onMobileClose={() => setMobileNavOpen(false)}
          />
        </div>

        {/* Mobile Sidebar Overlay */}
        {mobileNavOpen && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0, 0, 0, 0.5)",
              zIndex: 30,
            }}
            className="lg:hidden block"
            onClick={() => setMobileNavOpen(false)}
          />
        )}

        {/* Mobile Sidebar */}
        <div
          style={{
            position: "fixed",
            left: 0,
            top: 60,
            width: "260px",
            height: "calc(100vh - 60px)",
            background: "var(--background)",
            borderRight: "1px solid var(--border)",
            zIndex: 35,
            transform: mobileNavOpen ? "translateX(0)" : "translateX(-100%)",
            transition: "transform 200ms ease",
            overflowY: "auto",
          }}
          className="lg:hidden block"
        >
          <Sidebar
            onSearchOpen={() => setSearchOpen(true)}
            mobileOpen={mobileNavOpen}
            onMobileClose={() => setMobileNavOpen(false)}
          />
        </div>

        {/* Center content area */}
        <main
          onMouseEnter={() => setHoverZone("center")}
          onMouseLeave={() => setHoverZone(null)}
          style={{
            flex: 1,
            minWidth: 0,
            overflowY: "auto",
            display: "flex",
            justifyContent: "center",
            opacity: hoverZone === "left" || hoverZone === "right" ? 0.35 : 1,
            transition: "opacity 300ms ease",
          }}
          className="lg:pr-80 pr-0 lg:pl-0 pl-0"
        >
          <Switch>
            {/* Root → home */}
            <Route path="/" component={() => <MarkdownView pageId="home" />} />
            {/* All other routes — /* wildcard captures the full path */}
            <Route path="/*" component={PageView} />
            <Route component={NotFoundPage} />
          </Switch>
        </main>

        {/* Right Sidebar - Fixed Contact Section - hidden on mobile */}
        <div
          onMouseEnter={() => setHoverZone("right")}
          onMouseLeave={() => setHoverZone(null)}
          style={{
            position: "fixed",
            right: 0,
            top: 0,
            width: "320px",
            height: "100vh",
            overflowY: "auto",
            borderLeft: "1px solid var(--border)",
            background: "var(--background)",
            flexDirection: "column",
            opacity: hoverZone === "center" ? 0.35 : 1,
            transition: "opacity 300ms ease",
          }}
          className="hidden lg:flex"
        >
          <ContactSection imageSrc="/halftone_gu_white.png" />
        </div>
      </div>

      {/* Search modal */}
      <SearchModal
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <AppLayout />
      </ThemeProvider>
    </ErrorBoundary>
  );
}
