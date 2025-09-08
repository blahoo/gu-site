import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface Phrase {
  text: string;
  images: string[];
  link: string;
}

interface SlideshowProps {
  images: string[];
  currentIndex: number; // controlled from parent
  phrases: Phrase[];
  onImageClick: (link: string) => void;
  containerHeight?: number; // maximum container height
  verticalOffset?: number; // tweak top/bottom spacing
}

export function AnimatedSlideshow({
  images,
  currentIndex,
  phrases,
  onImageClick,
  containerHeight = 320, // max height
  verticalOffset = 30, // spacing tweak
}: SlideshowProps) {
  const [scaleFactor, setScaleFactor] = useState(1);
  const [layout, setLayout] = useState<
    "mobile" | "tablet" | "desktop"
  >("desktop");

  // Update scale + layout
  useEffect(() => {
    const updateScale = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setScaleFactor(1);
        setLayout("mobile");
      } else {
        setScaleFactor(1);
        setLayout("desktop");
      }
    };
    updateScale();
    window.addEventListener("resize", updateScale);
    return () =>
      window.removeEventListener("resize", updateScale);
  }, []);

  const getVisibleCards = () => {
    const cards = [];
    for (let i = -1; i <= 1; i++) {
      const index =
        (currentIndex + i + images.length) % images.length;
      
      // Find which phrase this image belongs to
      const phraseIndex = (currentIndex + i + phrases.length) % phrases.length;
      const phrase = phrases[phraseIndex];
      
      cards.push({
        id: `card-${index}`,
        image: images[index],
        position: i,
        link: phrase.link,
      });
    }
    return cards;
  };

  const visibleCards = getVisibleCards();

  const getCardStyle = (position: number) => {
    let base;
    if (layout === "mobile") {
      switch (position) {
        case -1:
          base = {
            x: -20,
            y: 5 + verticalOffset,
            rotate: -5,
            scale: 0.7,
            opacity: 0.4,
            zIndex: 1,
          };
          break;
        case 0:
          base = {
            x: 80,
            y: 0 + verticalOffset,
            rotate: 0,
            scale: 1,
            opacity: 1,
            zIndex: 10,
          };
          break;
        case 1:
          base = {
            x: 160,
            y: 5 + verticalOffset,
            rotate: 5,
            scale: 0.75,
            opacity: 0.7,
            zIndex: 5,
          };
          break;
        default:
          base = {
            x: 0,
            y: verticalOffset,
            rotate: 0,
            scale: 1,
            opacity: 1,
            zIndex: 1,
          };
      }
    } else {
      switch (position) {
        case -1:
          base = {
            x: -50,
            y: 10 + verticalOffset,
            rotate: -8,
            scale: 0.8,
            opacity: 0.4,
            zIndex: 1,
          };
          break;
        case 0:
          base = {
            x: 120,
            y: 0 + verticalOffset,
            rotate: 0,
            scale: 1,
            opacity: 1,
            zIndex: 10,
          };
          break;
        case 1:
          base = {
            x: 280,
            y: 10 + verticalOffset,
            rotate: 8,
            scale: 0.85,
            opacity: 0.7,
            zIndex: 5,
          };
          break;
        default:
          base = {
            x: 0,
            y: verticalOffset,
            rotate: 0,
            scale: 1,
            opacity: 1,
            zIndex: 1,
          };
      }
    }
    return {
      ...base,
      x: base.x * scaleFactor,
      y: base.y * scaleFactor,
      scale: base.scale * scaleFactor,
    };
  };

  // Compute dynamic container height based on scaleFactor
  const dynamicHeight = containerHeight * scaleFactor;

  return (
    <div
      className="relative w-full overflow-hidden flex justify-center"
      style={{ height: dynamicHeight }}
    >
      <AnimatePresence mode="popLayout">
        {visibleCards.map((card) => {
          const style = getCardStyle(card.position);

          return (
            <motion.div
              key={card.id}
              className="absolute left-0 top-0"
              initial={
                card.position === 1
                  ? {
                      x:
                        (layout === "mobile" ? 240 : 400) *
                        scaleFactor,
                      y: verticalOffset,
                      rotate: 12,
                      scale: 0.6 * scaleFactor,
                      opacity: 0,
                    }
                  : style
              }
              animate={style}
              exit={
                card.position === -1
                  ? {
                      x:
                        (layout === "mobile" ? -120 : -200) *
                        scaleFactor,
                      y: verticalOffset,
                      rotate: -12,
                      scale: 0.6 * scaleFactor,
                      opacity: 0,
                    }
                  : style
              }
              transition={{
                duration: 1.4,
                ease: [0.23, 1, 0.32, 1],
                x: {
                  type: "spring",
                  stiffness: 60,
                  damping: 20,
                },
                y: {
                  type: "spring",
                  stiffness: 60,
                  damping: 20,
                },
                rotate: {
                  duration: 1.4,
                  ease: [0.23, 1, 0.32, 1],
                },
                scale: {
                  duration: 1.2,
                  ease: [0.23, 1, 0.32, 1],
                },
                opacity: { duration: 1.0 },
              }}
            >
              <motion.div
                whileHover={{
                  scale: 1.03,
                  zIndex: 20,
                  transition: { duration: 0.2 },
                }}
                className="cursor-pointer"
                onClick={() => onImageClick(card.link)}
              >
                <ImageWithFallback
                  src={card.image}
                  alt={`Slide ${card.position + 2}`}
                  className="w-[180px] h-[250px] md:w-[200px] md:h-[260px] lg:w-[220px] lg:h-[280px] rounded-xl object-cover border border-gray-200"
                />
              </motion.div>
            </motion.div>
          );
        })}
      </AnimatePresence>

      {/* Left fade */}
      <div
        className="absolute left-0 top-0 h-full w-16 md:w-24 pointer-events-none z-20"
        style={{
          background:
            "linear-gradient(to right, #ffffff 0%, #ffffff 30%, rgba(255,255,255,0.6) 60%, rgba(255,255,255,0) 100%)",
        }}
      />

      {/* Right fade */}
      <div
        className="absolute right-0 top-0 h-full w-16 md:w-24 pointer-events-none z-20"
        style={{
          background:
            "linear-gradient(to left, #ffffff 0%, #ffffff 30%, rgba(255,255,255,0.6) 60%, rgba(255,255,255,0) 100%)",
        }}
      />
    </div>
  );
}