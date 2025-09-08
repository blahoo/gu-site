export interface CMSImage {
  url: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface CMSEntry {
  id: string;
  title: string;
  description: string;
  date?: string;
  content: string;
  coverImage?: CMSImage;
  images?: CMSImage[];
  category: "project" | "thought";
  slug: string;
  markdownPath?: string;
}

// Content loading utility function
async function loadMarkdownContent(
  slug: string,
  category: "project" | "thought"
): Promise<string> {
  const path = `/content/${category}s/${slug}.md`;

  try {
    const response = await fetch(path);
    if (!response.ok) throw new Error(`Failed to fetch ${path}`);
    return await response.text();
  } catch (err) {
    console.error(err);
    return `# Content Loading Error\n\nFailed to load content for "${slug}" from ${path}.`;
  }
}

// Content registry with metadata
const contentRegistry: Omit<CMSEntry, "content">[] = [
  // Projects
  {
    id: "1",
    title: "Warrig x1",
    description: "Small electric vehicle",
    date: "Project completed 2024",
    category: "project",
    slug: "warrig-x1",
    coverImage: { url: "/assets/sittingwarrig.png", alt: "Electric vehicle prototype" },
  },
  {
    id: "2",
    title: "Apoc",
    description: "Huge ass Hackathon",
    date: "Event held 2024",
    category: "project",
    slug: "apoc",
    coverImage: { url: "/assets/busbot.png", alt: "Hackathon workspace" },
  },
  {
    id: "3",
    title: "Autonomous Drone",
    description: "Emergency response mapping",
    date: "Project completed 2023",
    category: "project",
    slug: "drone-project",
    coverImage: { url: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=400&h=300&fit=crop", alt: "Autonomous drone technology" },
  },
  {
    id: "4",
    title: "Digital Security Platform",
    description: "Next-gen encryption tools",
    date: "Project completed 2023",
    category: "project",
    slug: "security-system",
    coverImage: { url: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=300&fit=crop", alt: "Digital security systems" },
  },
  // Thoughts
  {
    id: "5",
    title: "Toronto has some real problems",
    description: "A critical look at urban challenges",
    date: "June 2025",
    category: "thought",
    slug: "toronto-problems",
    coverImage: { url: "/assets/cntower.png", alt: "Toronto cityscape" },
  },
  {
    id: "6",
    title: "Here's what funny about robotics",
    description: "Observations from the world of autonomous systems",
    date: "March 2024",
    category: "thought",
    slug: "robotics-funny",
    coverImage: { url: "/assets/busbot.png", alt: "Robotic components" },
  },
  {
    id: "7",
    title: "What poker taught me about engineering",
    description: "Life lessons from the tables",
    date: "January 2024",
    category: "thought",
    slug: "poker-lessons",
    coverImage: { url: "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=400&h=300&fit=crop", alt: "Poker table and cards" },
  },
  {
    id: "8",
    title: "Why I might just dropout and hit the tables",
    description: "The entrepreneur vs. education dilemma",
    date: "December 2023",
    category: "thought",
    slug: "dropout-dreams",
    coverImage: { url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop", alt: "Casino poker room" },
  },
];

// CMS functions
export class CMS {
  static async getEntries(category?: "project" | "thought"): Promise<CMSEntry[]> {
    const entries = category ? contentRegistry.filter(e => e.category === category) : contentRegistry;
    const entriesWithContent = await Promise.all(
      entries.map(async (entry) => {
        const content = await loadMarkdownContent(entry.slug, entry.category);
        return { ...entry, content };
      })
    );
    return entriesWithContent;
  }

  static async getEntryBySlug(slug: string): Promise<CMSEntry | null> {
    const entry = contentRegistry.find(e => e.slug === slug);
    if (!entry) return null;
    const content = await loadMarkdownContent(entry.slug, entry.category);
    return { ...entry, content };
  }

  static async getEntriesForDisplay(category?: "project" | "thought"): Promise<Omit<CMSEntry, "content">[]> {
    return category ? contentRegistry.filter(e => e.category === category) : contentRegistry;
  }
}
