import { useState } from "react";
import { useRouter } from "./Router";
import { motion, AnimatePresence } from "motion/react";

export function Navigation() {
  const { currentPath, navigate } = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === "/about" && currentPath === "/about")
      return true;
    if (
      path === "/projects" &&
      (currentPath === "/projects" ||
        currentPath.startsWith("/project/"))
    )
      return true;
    if (
      path === "/thoughts" &&
      (currentPath === "/thoughts" ||
        currentPath.startsWith("/thought/"))
    )
      return true;
    if (path === "/experience" && currentPath === "/experience")
      return true;
    return false;
  };

  const navItems = [
    { path: "/about", label: "About" },
    { path: "/projects", label: "Projects" },
    { path: "/thoughts", label: "Thoughts" },
    { path: "/experience", label: "Experience" },
  ];

  const handleNavigate = (path: string) => {
    navigate(path);
    setIsOpen(false); // close menu after selecting
  };

  return (
    <nav className="font-['Inter:Regular',_sans-serif] font-normal text-[13px]">
      {/* Mobile floating button */}
      <div className="fixed bottom-4 right-4 md:hidden z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-black text-white w-16 h-16 rounded-full shadow-lg flex items-center justify-center text-2xl"
        >
          {isOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Expandable menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-white rounded-xl shadow-lg p-6 flex flex-col gap-4 w-64 md:hidden z-40"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{
              type: "spring",
              stiffness: 120,
              damping: 20,
            }}
          >
            {navItems.map((item) => (
              <motion.button
                key={item.path}
                onClick={() => handleNavigate(item.path)}
                className={`relative ${isActive(item.path) ? "text-[#454955]" : "text-[#0d0a0b]"} hover:text-[#0d0a0b] transition-colors duration-200 flex justify-center`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.label}
                {isActive(item.path) && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -bottom-1 left-1/4 right-1/4 h-0.5 bg-[#454955]"
                    initial={false}
                    transition={{
                      type: "spring",
                      bounce: 0.2,
                      duration: 0.6,
                    }}
                  />
                )}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop nav */}
      <div className="hidden md:flex justify-start gap-16 pt-[60px] max-w-md mx-auto">
        {navItems.map((item) => (
          <motion.button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`relative ${isActive(item.path) ? "text-[#454955]" : "text-[#0d0a0b]"} hover:text-[#0d0a0b] transition-colors duration-200`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {item.label}
            {isActive(item.path) && (
              <motion.div
                layoutId="activeTab"
                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#454955]"
                initial={false}
                transition={{
                  type: "spring",
                  bounce: 0.2,
                  duration: 0.6,
                }}
              />
            )}
          </motion.button>
        ))}
      </div>
    </nav>
  );
}