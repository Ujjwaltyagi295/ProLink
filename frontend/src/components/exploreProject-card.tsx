import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Bookmark } from "lucide-react";
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";

import { ProjectData } from "@/types/project";


interface ExploreProjectCardprp {
  project:ProjectData
  viewMode: "grid" | "list";
}

export const ExploreProjectCard = ({
  project,
  viewMode
}: ExploreProjectCardprp) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
 
  // Determine if we should use list view based on screen size and prop
  const [effectiveViewMode, setEffectiveViewMode] = useState<"grid" | "list">(viewMode);

  // Check for mobile screen on mount and window resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkMobile();
    
    // Listen for resize events
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Update effective view mode when viewMode prop or isMobile changes
  useEffect(() => {
    // Force list view on mobile screens regardless of prop value
    setEffectiveViewMode(isMobile ? "list" : (viewMode as "grid" | "list"));
  }, [viewMode, isMobile]);

  // Avatar background colors
  const avatarColors = {
    yellow: "bg-amber-500",
    blue: "bg-blue-500",
    indigo: "bg-indigo-500"
  };
  const avatarOptions = ["yellow", "blue", "indigo"] as const;
  const avatarColor = avatarOptions[project.id.charCodeAt(0) % avatarOptions.length]; // Deterministic pseudo-random color
  
  
  // Generate avatar element with fixed size
  const avatarElement = (
    <div 
      className={`flex-shrink-0 h-12 w-12 items-center justify-center rounded-md ${avatarColors[avatarColor]} text-white text-xl font-semibold overflow-hidden flex`}
    >
      {project.avatar ? (
        <img src={project.avatar} alt={project.name} className={`h-full w-full object-cover object-center`} />
      ) : (
        <span className="m-auto">{project.name.charAt(0).toUpperCase()}</span>
      )}
    </div>
  );

  // Different layout based on effective view mode
  if (effectiveViewMode === "list") {
    return (
      <Card 
        className="relative w-full transition-all hover:shadow-md"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex flex-col sm:flex-row w-full">
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
          
          <div className="flex-shrink-0 p-4 flex items-center justify-center">
            {avatarElement}
          </div>
          
          <div className="flex-grow p-4 flex flex-col sm:flex-row gap-4 w-full">
            <div className="flex-grow">
              <CardTitle className="mb-1 text-base font-semibold">{project.name}</CardTitle>
              <div className="relative h-10">
                <CardDescription className="line-clamp-2 text-sm text-muted-foreground">
                  {project.description}
                </CardDescription>
                <div className="absolute bottom-0 right-0 h-5 w-16 bg-gradient-to-l from-background to-transparent"></div>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-3 mb-3">
                {project.techStack.map((tech,index:number) => (
                  <Badge key={index} variant="secondary" className="px-2 py-0.5 text-xs bg-slate-100 text-slate-800 rounded">{tech}</Badge>
                ))}
              </div>
              
              <div className="flex flex-wrap gap-4 text-sm mb-3">
                <div>
                  <span className="text-muted-foreground">Team Size:</span> {project.teamSize}
                </div>
                <div>
                  <span className="text-muted-foreground">Created By:</span> {project.createdBy}
                </div>
              </div>
              
              <div className="flex gap-4 text-sm text-muted-foreground">
                <span>{project.roles.length} open positions</span>
              
              </div>
            </div>
            
            <div className="flex-shrink-0 flex items-end justify-end">
              <Button className="bg-black text-white hover:bg-gray-800">Apply</Button>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  // Default grid view - matching both example images
  return (
    <Card 
      className="relative flex flex-col transition-all hover:shadow-md overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col h-full">
        {/* Top section with content */}
        <div className="flex-grow overflow-hidden">
          <CardHeader className="flex flex-row items-start gap-4 pb-2 pt-4 px-4">
            {avatarElement}
            <div className="flex-grow overflow-hidden">
              <CardTitle className="text-base font-semibold mb-1">{project.name}</CardTitle>
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
                <Badge key={index} variant="secondary" className="px-2 py-0.5 text-xs bg-slate-100 text-slate-800 rounded">{tech}</Badge>
              ))}
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
        
        {/* Card Footer - Inside the card */}
        <CardFooter className="w-full mt-auto py-3 px-4 border-t bg-white">
          <div className="w-full flex justify-between items-center">
            <div>
              <div className="text-sm font-medium">{project.roles.length} open positions</div>
              <div className="flex gap-4 text-xs text-muted-foreground">
               
              </div>
            </div>
            <Button className="bg-black text-white hover:bg-gray-800">Apply</Button>
          </div>
        </CardFooter>
      </div>
    </Card>
  );
};