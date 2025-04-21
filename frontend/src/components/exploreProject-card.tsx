import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Bookmark } from "lucide-react";
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";

import { ProjectData } from "@/types/project";

interface ExploreProjectCardprp {
  project: ProjectData;
  viewMode: "grid" | "list";
}

export const ExploreProjectCard = ({
  project,
  viewMode,
}: ExploreProjectCardprp) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [effectiveViewMode, setEffectiveViewMode] = useState<"grid" | "list">(
    viewMode
  );

  const techstack = project.techStack.length - 3;
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();

    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    setEffectiveViewMode(isMobile ? "list" : (viewMode as "grid" | "list"));
  }, [viewMode, isMobile]);

  const avatarColors = {
    yellow: "bg-amber-500",
    blue: "bg-blue-500",
    indigo: "bg-indigo-500",
  };
 
    const avatarOptions = ["yellow", "blue", "indigo"] as const;
    const avatarColor =
      avatarOptions[project.id.charCodeAt(0) % avatarOptions.length];
    
    const avatarElement = (
      <div
        className={`flex-shrink-0 h-16 w-16 items-center justify-center rounded-md border-4 border-gray-500 overflow-hidden flex ${
          project.avatar ? "" : avatarColors[avatarColor]
        }`}
      >
        {project.avatar ? (
          <img
            src={project.avatar}
            alt={project.name}
            className="h-full w-full object-cover object-center"
          />
        ) : (
          <span className="m-auto text-lg font-semibold text-white">
            {project.name.charAt(0).toUpperCase()}
          </span>
        )}
      </div>
    );
    
  if (effectiveViewMode === "list") {
    return (
      <Card
        className="relative w-full transition-all hover:shadow-md"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex flex-col sm:flex-row w-full p-4">
          {isHovered && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-2 z-10"
              onClick={() => setIsBookmarked(!isBookmarked)}
            >
              <Bookmark
                className={isBookmarked ? "fill-primary" : ""}
                size={20}
              />
            </Button>
          )}

          <div className="flex-shrink-0 mr-4">
            {avatarElement}
          </div>

          <div className="flex-grow">
            <div className="flex flex-col">
              <CardTitle className="text-lg font-bold mb-1">
                {project.name}
              </CardTitle>
              
              <div className="relative mb-3">
                <CardDescription className="line-clamp-2 text-sm text-muted-foreground">
                  {project.description}
                </CardDescription>
                <div className="absolute bottom-0 right-0 h-5 w-16 bg-gradient-to-l from-background to-transparent"></div>
              </div>

              <div className="flex flex-wrap gap-2 mt-1 mb-3">
                {project.techStack.slice(0, 4).map((tech, index: number) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="px-2 py-0.5 rounded-full text-xs font-medium border bg-neutral-100 text-neutral-600 border-neutral-200"
                  >
                    {tech}
                  </Badge>
                ))}
                {project.techStack.length > 4 && (
                  <Badge
                    variant="secondary"
                    className="px-2 py-0.5 rounded-full text-xs font-medium border bg-neutral-100 text-neutral-600 border-neutral-200"
                  >
                    {`+${project.techStack.length - 4}`}
                  </Badge>
                )}
              </div>

              <div className="flex flex-wrap gap-5 text-sm mb-4">
                <div>
                  <span className="text-muted-foreground font-medium">Team Size:</span>{" "}
                  <span className="font-semibold">{project.teamSize}</span>
                </div>
                <div>
                  <span className="text-muted-foreground font-medium">Created By:</span>{" "}
                  <span className="font-semibold">{project.createdBy}</span>
                </div>
              </div>

              <div className="flex justify-between items-center mt-1">
                <div className="text-sm font-medium text-primary">
                  {project.roles.length} open position{project.roles.length !== 1 ? 's' : ''}
                </div>
                <Button className="bg-black cursor-pointer text-white hover:bg-gray-800">
                  Apply
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    );
  }
  return (
    <Card
      className="relative hover:scale-[1.02]  duration-500 ease-in-out transition-all  flex flex-col hover:shadow-md overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col h-full">
        {/* Top section with content */}
        <div className="flex-grow overflow-hidden">
          <CardHeader className="flex flex-row items-start gap-4 pb-2 pt-4 px-4">
            {avatarElement}
            <div className="flex-grow overflow-hidden">
              <CardTitle className="text-base font-semibold mb-1">
                {project.name}
              </CardTitle>
              <div className="relative h-10">
                <CardDescription className="line-clamp-2 text-sm text-muted-foreground">
                  {project.description}
                </CardDescription>
                <div className="absolute bottom-0 right-0 h-5 w-16 bg-gradient-to-l from-background to-transparent"></div>
              </div>
            </div>
            {isHovered && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-2"
                onClick={() => setIsBookmarked(!isBookmarked)}
              >
                <Bookmark
                  className={isBookmarked ? "fill-primary" : ""}
                  size={20}
                />
              </Button>
            )}
          </CardHeader>

          <CardContent className="pt-4 px-4 pb-2">
            <div className="flex flex-wrap gap-2 mb-4">
              {project.techStack?.slice(0, 3).map((tech, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="px-2 py-0.5 rounded-full text-xs font-medium border bg-neutral-100 text-neutral-600 border-neutral-200"
                >
                  {tech}
                </Badge>
              ))}
              {techstack > 0 && (
                <Badge
                  variant="secondary"
                  className="px-2 py-0.5 rounded-full text-xs font-medium border bg-neutral-100 text-neutral-600 border-neutral-200"
                >
                  {`+${techstack}`}
                </Badge>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-muted-foreground mb-1">Team Size</div>
                <div className="font-medium">{project.teamSize}</div>
              </div>

              <div>
                <div className="text-muted-foreground mb-1">Created By</div>
                <div className="font-medium">{project.createdBy}</div>
              </div>
            </div>
          </CardContent>
        </div>

        <CardFooter className="w-full mt-auto py-3 px-4 border-t bg-white">
          <div className="w-full flex justify-between items-center">
            <div>
              <div className="text-sm font-medium">
                {project.roles.length} open position{project.roles.length !== 1 ? 's' : ''}
              </div>
              <div className="flex gap-4 text-xs text-muted-foreground"></div>
            </div>
            <Button className="bg-black cursor-pointer text-white hover:bg-gray-800">
              Apply
            </Button>
          </div>
        </CardFooter>
      </div>
    </Card>
  );
};
