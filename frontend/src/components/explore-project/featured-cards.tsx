import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";

interface Extension {
  id: number;
  title: string;
  description: string;
  icon: string;
  iconBg: string;
  iconBorder: string;
  openPositions: number;
  techStack: string[];
}
const extensions: Extension[] = [
  {
    id: 1,
    title: "Obsidian",
    description:
      "Building a second-brain productivity tool using Electron and Markdown. We're looking for frontend devs to enhance UX.",
    icon: "https://i.imgur.com/JU0PAZT.jpeg",
    iconBg: "bg-purple-600",
    iconBorder: "border-gray-600",
    openPositions: 2,
    techStack: ["React", "TypeScript", "Node.js"],
  },
  {
    id: 2,
    title: "Cursor",
    description:
      "Creating a collaborative code editor with AI suggestions. Seeking devs with experience in real-time syncing and extensions.",
    icon: "https://i.imgur.com/nC5l04b.jpeg",
    iconBg: "bg-gray-600",
    iconBorder: "border-gray-600",
    openPositions: 3,
    techStack: ["JavaScript", "Electron", "Redux", "Angular", "React"],
  },
  {
    id: 3,
    title: "Video Downloader",
    description:
      "Developing a cross-platform video downloader app with smart queue management and format conversion features.",
    icon: "https://i.imgur.com/FpvLdZq.jpeg",
    iconBg: "bg-red-600",
    iconBorder: "border-gray-600",
    openPositions: 1,
    techStack: ["Python", "FFmpeg", "REST API", "AI/ML"],
  },
];

const MotionCard = motion.create(Card);

export default function ExtensionCards() {
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: {
      y: 50,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        mass: 0.8,
        damping: 12,
      },
    },
  };

  return (
    <div className="w-full">
      <motion.div
        ref={containerRef}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        {extensions.map((extension) => (
          <MotionCard
            key={extension.id}
            className="border border-gray-200 hover:scale-[1.02] duration-500 ease-in-out transition-all shadow-sm h-full"
            variants={cardVariants}
          >
            <CardContent className="p-4 pb-2 flex flex-col items-center">
              <div
                className={cn(
                  "w-16 h-16 rounded-xl overflow-hidden mb-3 border-4",
                  extension.iconBorder
                )}
              >
                <img
                  src={extension.icon || "/placeholder.svg"}
                  alt={extension.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="text-center w-full">
                <h3 className="text-lg font-bold mb-1">{extension.title}</h3>
                <div className="relative">
                  <p className="text-gray-600 text-xs mb-3 line-clamp-2 relative">
                    {extension.description}
                    <span className="absolute right-0 bottom-0 w-16 h-full bg-gradient-to-l from-white to-transparent"></span>
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-1.5 mb-2 w-full">
                {extension.techStack.slice(0, 3).map((tech, techIdx) => (
                  <span
                    key={techIdx}
                    className="px-2 py-0.5 rounded-full text-xs font-medium border bg-neutral-100 text-neutral-600 border-neutral-200"
                  >
                    {tech}
                  </span>
                ))}
                {extension.techStack.length > 3 && (
                  <span className="px-2 py-0.5 rounded-full text-xs font-medium border bg-neutral-100 text-neutral-600 border-neutral-200">
                    +{extension.techStack.length - 3} more
                  </span>
                )}
              </div>
            </CardContent>

            <CardFooter className="flex justify-between items-center p-4 pt-1 mt-auto">
              <div className="flex items-center text-xs font-semibold font-sans text-gray-600">
                <span>
                  {extension.openPositions} Open Position
                  {extension.openPositions !== 1 ? "s" : ""}
                </span>
              </div>
              <Button
                size="sm"
                className="h-8 px-3 py-1 text-xs bg-blue-600 hover:bg-blue-700 text-white"
              >
                Apply
              </Button>
            </CardFooter>
          </MotionCard>
        ))}
      </motion.div>
    </div>
  );
}
