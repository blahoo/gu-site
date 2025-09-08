import { useState, useEffect } from "react";
import { useRouter } from "./Router";
import { CMS, CMSEntry } from "../data/cms";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { PageTransition } from "./PageTransition";

interface MarkdownJournalProps {
  slug: string;
  category: "project" | "thought";
}

export function MarkdownJournal({
  slug,
  category,
}: MarkdownJournalProps) {
  const { navigate } = useRouter();
  const [entry, setEntry] = useState<CMSEntry | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEntry = async () => {
      try {
        const entryData = await CMS.getEntryBySlug(slug);
        setEntry(entryData);
      } catch (error) {
        console.error("Failed to load entry:", error);
      } finally {
        setLoading(false);
      }
    };

    loadEntry();
  }, [slug]);

  // Enhanced markdown parsing with image support
  const parseMarkdown = (text: string) => {
    // Add safety check for text parameter
    if (!text || typeof text !== 'string') {
      return [<p key="error" className="mb-4 text-red-500">Content could not be loaded.</p>];
    }

    return text.split("\n\n").map((paragraph, index) => {
      // Handle images
      const imageMatch = paragraph.match(/!\[(.*?)\]\((.*?)\)/);
      if (imageMatch) {
        const [, alt, src] = imageMatch;
        return (
          <div key={index} className="mb-6">
            <ImageWithFallback
              src={src}
              alt={alt}
              className="w-full h-auto rounded-[8px] shadow-lg"
            />
          </div>
        );
      }

      if (paragraph.startsWith("# ")) {
        return (
          <h1
            key={index}
            className="text-xl font-medium mb-4 mt-8 first:mt-0"
          >
            {paragraph.slice(2)}
          </h1>
        );
      }
      if (paragraph.startsWith("## ")) {
        return (
          <h2
            key={index}
            className="text-lg font-medium mb-3 mt-6"
          >
            {paragraph.slice(3)}
          </h2>
        );
      }
      if (paragraph.startsWith("### ")) {
        return (
          <h3
            key={index}
            className="text-base font-medium mb-2 mt-4"
          >
            {paragraph.slice(4)}
          </h3>
        );
      }
      if (
        paragraph.startsWith("- ") ||
        paragraph.startsWith("* ")
      ) {
        const items = paragraph
          .split("\n")
          .map((item) => item.slice(2));
        return (
          <ul
            key={index}
            className="list-disc ml-5 mb-4 space-y-1"
          >
            {items.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        );
      }
      return (
        <p key={index} className="mb-4 leading-relaxed">
          {paragraph}
        </p>
      );
    });
  };

  const handleBack = () => {
    if (category === "project") {
      navigate("/projects");
    } else {
      navigate("/thoughts");
    }
  };

  if (loading) {
    return (
      <PageTransition>
        <div className="max-w-md mx-auto px-12 pt-16">
          <div className="text-[15px]">Loading...</div>
        </div>
      </PageTransition>
    );
  }

  if (!entry) {
    return (
      <PageTransition>
        <div className="max-w-md mx-auto px-12 pt-16">
          <div className="text-[15px]">Entry not found</div>
          <button
            onClick={handleBack}
            className="mt-4 text-[13px] text-[#454955] hover:text-[#0d0a0b] transition-colors underline"
          >
            Go back
          </button>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="max-w-sm md:max-w-xl lg:max-w-2xl mx-auto px-4 md:px-12 pt-16 pb-20">
        {/* Back button */}
        <div className="mb-8">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-[13px] text-[#454955] hover:text-[#0d0a0b] transition-colors"
          >
            <div className="rotate-180 w-3 h-3">
              <svg
                className="block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 16 16"
              >
                <path
                  d="M14.8492 8.70711C15.2398 8.31658 15.2398 7.68342 14.8492 7.29289L8.48528 0.928932C8.09476 0.538408 7.46159 0.538408 7.07107 0.928932C6.68054 1.31946 6.68054 1.95262 7.07107 2.34315L12.7279 8L7.07107 13.6569C6.68054 14.0474 6.68054 14.6805 7.07107 15.0711C7.46159 15.4616 8.09476 15.4616 8.48528 15.0711L14.8492 8.70711ZM0 8V9H14.1421V8V7H0V8Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            Back to{" "}
            {category === "project" ? "Projects" : "Thoughts"}
          </button>
        </div>

        {/* Hero image */}
        {entry?.coverImage && (
          <div className="mb-8">
            <ImageWithFallback
              src={entry.coverImage.url}
              alt={entry.coverImage.alt}
              className="w-full h-auto md:h-64 lg:h-72 object-cover rounded-[8px] shadow-lg"
            />
          </div>
        )}

        {/* Title and date */}
        <div className="mb-8">
          <h1 className="text-lg md:text-xl lg:text-2xl font-['Inter:Bold',_sans-serif] font-bold mb-2">
            {entry?.title}
          </h1>
          {entry?.date && (
            <p className="text-[13px] md:text-[14px] lg:text-[15px] text-[#454955] mb-0">
              {entry.date}
            </p>
          )}
        </div>

        {/* Content */}
        <div className="text-[14px] md:text-[15px] lg:text-[16px] leading-relaxed font-['Inter:Regular',_sans-serif]">
          {entry && parseMarkdown(entry.content)}
        </div>

        {/* Footer */}
        <div className="mt-12 mb-8 pt-8 border-t border-gray-200">
          <button
            onClick={handleBack}
            className="text-[13px] md:text-[14px] lg:text-[15px] text-[#454955] hover:text-[#0d0a0b] transition-colors underline"
          >
            ← Back to{" "}
            {category === "project" ? "Projects" : "Thoughts"}
          </button>
        </div>
      </div>
    </PageTransition>
  );
}