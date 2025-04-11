import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

type ExploreIconProps = {
  isHover: boolean;
};
export const ExploreIcon = ({ isHover }: ExploreIconProps) => {
  const controls = useAnimation();

  useEffect(() => {
    if (isHover) {
      controls.start({
        pathLength: [0, 1],
        transition: {
          duration: 0.6,
          ease: "easeInOut",
        },
      });
    }
  }, [isHover, controls]);

  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill={isHover ? "oklch(90.5% 0.182 98.111)" : "none"}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-file"
      animate={{ scale: isHover ? 1.2 : 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <motion.path
        d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"
        initial={{ pathLength: 1 }}
        animate={controls}
      />
      <motion.path
        d="M14 2v4a2 2 0 0 0 2 2h4"
        initial={{ pathLength: 1 }}
        animate={controls}
        transition={{ delay: 0.1 }}
      />
    </motion.svg>
  );
};
export const ProjectIcon = ({ isHover }: ExploreIconProps) => {
  const controls = useAnimation();

  useEffect(() => {
    if (isHover) {
      controls.start({
        pathLength: [0, 1],
        transition: {
          duration: 0.6,
          ease: "easeInOut",
        },
      });
    }
  }, [isHover, controls]);

  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill={isHover ? "oklch(90.5% 0.182 98.111)" : "none"}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-archive-icon lucide-archive"
      animate={{ scale: isHover ? 1.2 : 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <rect width="20" height="5" x="2" y="3" rx="1" />
      <motion.path
        initial={{ pathLength: 1 }}
        animate={controls}
        d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8"
      />
      <motion.path
        initial={{ pathLength: 1 }}
        animate={controls}
        transition={{ delay: 0.1 }}
        d="M10 12h4"
      />
    </motion.svg>
  );
};
