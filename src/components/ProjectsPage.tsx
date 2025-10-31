import { useRouter } from "./Router";
import { PageTransition } from "./PageTransition";
import { useState, useRef, useLayoutEffect, useEffect } from "react";
import { motion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { CMS, CMSEntry } from "../data/cms";

export function ProjectsPage() {
  const { navigate } = useRouter();
  const [projects, setProjects] = useState<Omit<CMSEntry, 'content'>[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const projectData = await CMS.getEntriesForDisplay('project');
        setProjects(projectData);
      } catch (error) {
        console.error('Failed to load projects:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  // No split: always show all projects

  // Equalize card heights to the tallest visible card
  useLayoutEffect(() => {
    const equalizeCardHeights = () => {
      const cards = document.querySelectorAll<HTMLDivElement>(
        ".project-card",
      );
      if (!cards.length) return;

      // Reset to natural height to measure correctly
      cards.forEach((card) => {
        card.style.height = "auto";
      });

      let max = 0;
      cards.forEach((card) => {
        const h = card.offsetHeight;
        if (h > max) max = h;
      });

      cards.forEach((card) => {
        card.style.height = `${max}px`;
      });
    };

    equalizeCardHeights();
    const onResize = () => equalizeCardHeights();
    window.addEventListener("resize", onResize);

    // Re-run after async image loads
    const t1 = setTimeout(equalizeCardHeights, 200);
    const t2 = setTimeout(equalizeCardHeights, 800);

    return () => {
      window.removeEventListener("resize", onResize);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [projects]);

  const ProjectCard = ({
    project,
  }: {
    project: Omit<CMSEntry, 'content'>;
  }) => (
    <motion.div
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
      className="relative cursor-pointer"
      onClick={() => navigate(`/project/${project.slug}`)}
    >
      <div className="project-card flex flex-col white bg-opacity-50 rounded-[10px] shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
        {/* Top half image */}
        <div className="flex-[0_0_50%] w-full">
          <ImageWithFallback
            src={project.coverImage?.url || "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop"}
            alt={project.coverImage?.alt || project.title}
            className="project-card-img w-full h-full object-cover"
          />
        </div>
        {/* Bottom half text */}
        <div className="flex-[0_0_50%] p-4 flex flex-col gap-2 justify-between">
          <div>
            <p className="text-xl md:text-xl lg:text-2xl font-semibold text-gray-900">
              {project.title}
            </p>
            <p className="text-base md:text-base lg:text-lg text-gray-700 mb-0">
              {project.description}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );

  if (loading) {
    return (
      <PageTransition>
        <div className="max-w-sm md:max-w-xl lg:max-w-2xl mx-auto px-4 md:px-12 pt-8 pb-20">
          <div className="text-[15px]">Loading projects...</div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="max-w-sm md:max-w-xl lg:max-w-2xl mx-auto px-4 md:px-12 pt-8 pb-20">
        {/* Small title */}
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 text-gray-900">
          Projects
        </h1>
        <div className="text-lg md:text-[16px] lg:text-[18px] mb-6 text-gray-800">
          <p className="leading-[normal]">
            I've built a few things here and there
          </p>
        </div>

        <div className="projects-grid">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </PageTransition>
  );
}