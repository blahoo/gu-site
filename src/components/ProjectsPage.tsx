import { useRouter } from "./Router";
import { PageTransition } from "./PageTransition";
import { useState, useRef, useLayoutEffect, useEffect } from "react";
import { motion } from "motion/react";
import { CMS, CMSEntry } from "../data/cms";

export function ProjectsPage() {
  const { navigate } = useRouter();
  const [showAll, setShowAll] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);
  const [animationComplete, setAnimationComplete] = useState(false);
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

  // Split projects into initial and additional for display
  const initialProjects = projects.slice(0, 2);
  const additionalProjects = projects.slice(2);

  useLayoutEffect(() => {
    if (containerRef.current) {
      const baseHeight = containerRef.current.scrollHeight;
      const extraPadding = 40; // space for hover animation
      setContentHeight(baseHeight + extraPadding);
    }
  }, [showAll]);

  const ProjectCard = ({
    project,
  }: {
    project: Omit<CMSEntry, 'content'>;
  }) => (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
      className="mb-6 relative cursor-pointer"
      onClick={() => navigate(`/project/${project.slug}`)}
    >
      <div
        className="flex white bg-opacity-50 rounded-[10px] shadow-md overflow-hidden
                   h-[150px] md:h-[160px] lg:h-[170px] hover:shadow-lg transition-shadow duration-200"
      >
        {/* Image */}
        <div
          className="flex-shrink-0 w-[120px] md:w-[130px] lg:w-[150px] h-full bg-center bg-cover bg-no-repeat"
          style={{ backgroundImage: `url('${project.coverImage?.url || 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop'}')` }}
        />
        <div className="flex flex-col justify-between p-4 flex-grow">
          <div>
            <p className="text-xl md:text-xl lg:text-2xl font-semibold text-gray-900">
              {project.title}
            </p>
            <p className="text-base md:text-base lg:text-lg text-gray-700">
              {project.description}
            </p>
          </div>
          <div className="self-start mt-3 bg-gray-100 h-[34px] md:h-[36px] rounded-[8px] px-4 border-gray-300 border-[1.5px] flex items-center justify-center gap-1">
            <span className="font-bold text-gray-900 text-sm md:text-sm lg:text-base">
              →{" "}
            </span>
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

        {initialProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}

        {additionalProjects.length > 0 && (
          <motion.div
            style={{
              overflow:
                showAll && animationComplete
                  ? "visible"
                  : "hidden",
            }}
            animate={{ height: showAll ? contentHeight : 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            onAnimationComplete={() => {
              if (showAll) setAnimationComplete(true);
            }}
            ref={containerRef}
            initial={false}
          >
            <div className="pb-2 px-2">
              {additionalProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </motion.div>
        )}

        {additionalProjects.length > 0 && (
          <div className="flex justify-center mb-8 mt-2">
            <motion.button
              onClick={() => {
                setAnimationComplete(false);
                setShowAll(!showAll);
              }}
              whileHover={{ scale: 1.05 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
              }}
              className="bg-gray-100 h-[28px] md:h-[28px] rounded-[8px] w-[130px] md:w-[150px] border-gray-300 border-[1.5px] border-solid hover:bg-gray-200 transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <span className="font-['Inter:Bold',_sans-serif] font-bold text-gray-900 text-[12px] md:text-[11px] lg:text-[12px]">
                {showAll ? "Show less" : "More projects"}
              </span>
            </motion.button>
          </div>
        )}
      </div>
    </PageTransition>
  );
}