import { useState, useEffect, useMemo } from "react";
import { motion } from "motion/react";
import { useRouter } from "./Router";
import { PageTransition } from "./PageTransition";
import { AnimatedSlideshow } from "./AnimatedSlideshow";

const phrases = [
  {
    text: "building",
    images: ["/assets/goodphoto.png"],
    link: "/projects",
  },
  {
    text: "pondering life choices",
    images: ["/assets/goodphoto.png"],
    link: "/thoughts",
  },
  {
    text: "building EV's",
    images: ["/assets/thecurb.png"],
    link: "/project/warrig-x1",
  },
  {
    text: "engineering drones",
    images: ["/assets/goodphoto.png"],
    link: "/project/drone-project",
  },
  {
    text: "hitting the tables",
    images: ["/assets/goodphoto.png"],
    link: "/thought/poker-lessons",
  },
];

export function AboutPage() {
  const { navigate } = useRouter();
  const allImages = useMemo(
    () => phrases.flatMap((p) => p.images),
    [],
  );

  const [currentIndex, setCurrentIndex] = useState(0);

  // rotate phrases
  useEffect(() => {
    const interval = setInterval(
      () =>
        setCurrentIndex((prev) => (prev + 1) % phrases.length),
      3000,
    );
    return () => clearInterval(interval);
  }, []);

  // preload next image
  useEffect(() => {
    const nextImage = new Image();
    nextImage.src =
      allImages[(currentIndex + 1) % allImages.length];
  }, [currentIndex, allImages]);

  const currentPhrase = phrases[currentIndex];

  return (
    <PageTransition>
      <div className="max-w-sm md:max-w-xl lg:max-w-2xl mx-auto px-4 md:px-12 pt-8 pb-20">
        {/* Intro */}
        <div className="text-lg md:text-lg lg:text-xl mb-4">
          <p>
            Hey, I'm{" "}
            <span className="font-bold">Gregory Gu</span>
          </p>
        </div>

        {/* Animated text */}
        <div className="text-lg md:text-lg lg:text-xl mb-8">
          <p>If I'm not playing p̶o̶k̶e̶r̶ cards</p>
          <span className="mr-2">I'm</span>
          <motion.span
            key={currentIndex}
            className="inline-block"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {currentPhrase.text.replace("I'm ", "")}
          </motion.span>
        </div>

        {/* Slideshow */}
        <div className="relative mb-16 flex justify-center">
          <div className="w-full max-w-[600px]">
            <AnimatedSlideshow
              images={allImages}
              currentIndex={currentIndex}
              phrases={phrases}
              onImageClick={(link) => navigate(link)}
            />
          </div>
        </div>

        {/* Activities */}
        <div className="text-lg md:text-base lg:text-lg mb-4">
          <p className="font-bold">
            Lately, I've been betting on the future
          </p>
          <ul className="list-disc ml-5">
            <li>constructing autonomous vehicles</li>
            <li>working on drones</li>
            <li>shipping (sometimes crappy) software</li>
          </ul>
        </div>

        {/* Buttons */}
        <motion.button
          onClick={() => navigate("/projects")}
          className="bg-neutral-100 h-[28px] md:h-[36px] rounded-lg w-[140px] md:w-[160px] text-xs md:text-sm border border-gray-800 hover:bg-neutral-200 transition-colors duration-200 mb-12 text-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Projects →
        </motion.button>

        <div className="text-lg md:text-base lg:text-lg mb-4">
          <p className="font-bold">
            Here's what gets me out of bed
          </p>
          <p>
            I am a 17 yo builder based in Toronto, Canada who
            does engineering projects from rocketry to electric
            transport to autonomous drones. I hope to maybe do
            something in defense or digital security — or just
            dropout and hit the tables.
          </p>
        </div>

        <motion.button
          onClick={() => navigate("/thoughts")}
          className="bg-neutral-100 h-[28px] md:h-[36px] rounded-lg w-[140px] md:w-[160px] text-xs md:text-sm border border-gray-800 hover:bg-neutral-200 transition-colors duration-200 mb-12 text-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Thoughts →
        </motion.button>

        <div className="text-lg md:text-base lg:text-lg mb-4">
          <p className="font-bold">What's the common suit?</p>
          <p>
            The types of projects I take on are diverse and
            require a broad range of skills. My experience has
            taught me that the greatest skill is to be able to
            learn other skills — or burn your fingers trying.
          </p>
        </div>

        <motion.button
          onClick={() => navigate("/experience")}
          className="bg-neutral-100 h-[28px] md:h-[36px] rounded-lg w-[140px] md:w-[160px] text-xs md:text-sm border border-gray-800 hover:bg-neutral-200 transition-colors duration-200 text-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Experience →
        </motion.button>
      </div>
    </PageTransition>
  );
}