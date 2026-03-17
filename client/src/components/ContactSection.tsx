// =============================================================================
// DESIGN SYSTEM: Obsidian-Inspired Knowledge Graph / Minimal Dark
// ContactSection: Fixed right sidebar with contact info and ASCII art
// Width: 320px, scrollable, positioned fixed on the right
// =============================================================================

interface ContactSectionProps {
  imageSrc: string;
}

export default function ContactSection({ imageSrc }: ContactSectionProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        padding: "2rem 1.5rem",
        fontSize: "0.85rem",
      }}
    >
      {/* Contact Header */}
      <div style={{ marginBottom: "2rem" }}>
        <h3
          style={{
            fontSize: "0.9rem",
            fontWeight: 600,
            color: "var(--muted-foreground)",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            marginBottom: "1rem",
          }}
        >
          Get in Touch
        </h3>
        <p
          style={{
            fontSize: "0.8rem",
            lineHeight: 1.5,
            color: "var(--muted-foreground)",
            marginBottom: "1.5rem",
          }}
        >
          Always open to interesting opportunities and conversations.
        </p>
      </div>

      {/* Contact Links */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          marginBottom: "2rem",
        }}
      >
        <a
          href="mailto:gregory@gregorygu.com"
          style={{
            color: "#4468F5",
            textDecoration: "none",
            fontSize: "0.85rem",
            fontWeight: 500,
            transition: "opacity 150ms ease",
            wordBreak: "break-word",
          }}
          onMouseEnter={(e) => {
            (e.target as HTMLElement).style.opacity = "0.7";
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLElement).style.opacity = "1";
          }}
        >
          Email
        </a>
        <a
          href="https://github.com/gregorygu"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "#4468F5",
            textDecoration: "none",
            fontSize: "0.85rem",
            fontWeight: 500,
            transition: "opacity 150ms ease",
          }}
          onMouseEnter={(e) => {
            (e.target as HTMLElement).style.opacity = "0.7";
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLElement).style.opacity = "1";
          }}
        >
          GitHub
        </a>
        <a
          href="https://linkedin.com/in/gregorygu"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "#4468F5",
            textDecoration: "none",
            fontSize: "0.85rem",
            fontWeight: 500,
            transition: "opacity 150ms ease",
          }}
          onMouseEnter={(e) => {
            (e.target as HTMLElement).style.opacity = "0.7";
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLElement).style.opacity = "1";
          }}
        >
          LinkedIn
        </a>
      </div>

      {/* Profile Image */}
      <div
        style={{
          flex: 1,
          backgroundImage: `url('${imageSrc}')`,
          backgroundSize: "contain",
          backgroundPosition: "bottom right",
          backgroundRepeat: "no-repeat",
          marginTop: "auto",
          minHeight: "200px",
        }}
      />
    </div>
  );
}
