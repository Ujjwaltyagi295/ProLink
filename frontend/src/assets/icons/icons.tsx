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
      fill={isHover ? "oklch(87.9% 0.169 91.605)" : "none"}
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
      fill={isHover ? "oklch(92.4% 0.12 95.746)" : "none"}
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

export const CreateIcon = ({ isHover }: ExploreIconProps) => {
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
      className="lucide lucide-square-plus-icon lucide-square-plus"
      animate={{ scale: isHover ? 1.2 : 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <motion.path
        initial={{ pathLength: 1 }}
        animate={controls}
        transition={{ delay: 0.1 }}
        d="M8 12h8"
      />
      <motion.path
        initial={{ pathLength: 1 }}
        animate={controls}
        transition={{ delay: 0.1 }}
        d="M12 8v8"
      />
    </motion.svg>
  );
};


export const CheckCircle = () => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      pathLength: 1,
      transition: { duration: 0.6, ease: "easeInOut" },
    });
  }, [controls]);

  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-circle-check-big-icon lucide-circle-check-big"
    >
      <motion.path
        initial={{ pathLength: 0 }}
        animate={controls}
        d="M21.801 10A10 10 0 1 1 17 3.335"
      />
      <motion.path
        initial={{ pathLength: 0 }}
        animate={controls}
        d="M9 11l3 3L22 4"
      />
    </motion.svg>
  );
};

