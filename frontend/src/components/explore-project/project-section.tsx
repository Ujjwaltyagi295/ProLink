import { useState, useEffect } from "react";
import { ExploreProjectCard } from "../explore-project/exploreProject-card";
import { Button } from "../ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { Grid, List } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import {  ProjectData } from "@/types/project";
import { SkeletonCard } from "../skeleton-cards";
import { useGetAllProjectQuery } from "@/services/projectQuery";
import { CommandPalette } from "../filtered-project/command-palette";

export const ProjectsSection = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [activeTab, setActiveTab] = useState("all");
  const [isMobile, setIsMobile] = useState(false);

 
 const {getAllProjects,isLoading}= useGetAllProjectQuery()


  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);

      if (mobile && viewMode === "grid") {
        setViewMode("list");
      }
    };

    // Initial check
    checkMobile();

    // Listen for resize events
    window.addEventListener("resize", checkMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkMobile);
  }, [viewMode,activeTab]);

  const fadeMotion = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.3 },
  };

  const getCardContainerClass = () => {
    if (viewMode === "grid") {
      return "grid grid-cols-1 sm:grid-cols-2 gap-6";
    } else {
      return "flex flex-col gap-4";
    }
  };

  return (
    <div className="w-full mt-4  max-w-6xl mx-auto py-6 px-4 sm:px-6">
      <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <TabsList className="mb-2 sm:mb-0">
            <TabsTrigger value="all">All Projects</TabsTrigger>
            <TabsTrigger value="recent">Most Recent</TabsTrigger>
            <TabsTrigger value="saved">Saved</TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-2">
            
               <CommandPalette />
              
         
            <div className="border rounded-md flex">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="icon"
                onClick={() => setViewMode("grid")}
                className="h-8 w-8"
                disabled={isMobile}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="icon"
                onClick={() => setViewMode("list")}
                className="h-8 w-8"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* All Projects Tab */}
        <TabsContent value="all">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <SkeletonCard />
                <SkeletonCard />
              </div>
            ) : getAllProjects ? (
              <motion.div
                key={viewMode}
                {...fadeMotion}
                className={getCardContainerClass()}
              >
                {getAllProjects.map((project: ProjectData) => (
                  <div
                    key={project.id}
                    className={viewMode === "list" ? "w-full" : ""}
                  >
                    <ExploreProjectCard project={project} viewMode={viewMode} />
                  </div>
                ))}
              </motion.div>
            ) : (
              ""
            )}
          </AnimatePresence>
        </TabsContent>

        {/* Recent Tab */}
        {/* <TabsContent value="recent">
          <motion.div
            {...fadeMotion}
            className="text-center py-8 text-muted-foreground"
          >
            Most recent projects will appear here
          </motion.div>
        </TabsContent> */}

        {/* Saved Tab */}
        {/* <TabsContent value="saved">
          <motion.div
            {...fadeMotion}
            className="text-center py-8 text-muted-foreground"
          >
            Your saved projects will appear here
          </motion.div>
        </TabsContent>*/}
      </Tabs>
    </div>
  );
};
