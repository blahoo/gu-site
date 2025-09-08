import { motion } from "motion/react";
import { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

export function PageTransition({
  children,
  className = "",
}: PageTransitionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }} // start slightly to the left
      animate={{ opacity: 1, x: 0 }} // slide to original position
      exit={{ opacity: 0, x: -30 }} // exit back to the left
      transition={{
        duration: 0.3,
        ease: [0.25, 0.25, 0, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

