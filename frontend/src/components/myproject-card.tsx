
import { MoreHorizontal, Share2 } from "lucide-react";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { capitalizeFirst, cn, formatDate } from "@/lib/utils";

import { ProjectData } from "@/types/project";
import { useMyProjectStore } from "@/store/useProjectStore";
import { navigate } from "@/lib/navigation";
import { useMyprojectQuery } from "@/services/myProjectQuery";

import { memo } from "react";

const ProjectAvatar = memo(
  ({ name, avatarUrl }: { name: string; avatarUrl?: string }) => {
    const initials = name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();

    const hasAvatar = Boolean(avatarUrl);

    return (
      <Avatar className="h-12 w-12 border border-gray-200 shadow-sm rounded-md">
        <AvatarImage src={avatarUrl || ""} alt={name} />
        <AvatarFallback
          className={cn(
            "rounded-md font-medium text-white flex items-center justify-center",
            !hasAvatar && "bg-blue-300"
          )}
        >
          {initials}
        </AvatarFallback>
      </Avatar>
    );
  }
);


const TechStack = memo(({ techs }: { techs: string[] }) => {
  const techStackToShow = techs.slice(0, 3);
  const remainingTech = techs.length - techStackToShow.length;
  
  const colors = ["bg-purple-500", "bg-blue-500","bg-[lch(47.918_59.303_288.421)]", ];
  
  return (
    <div className="flex flex-wrap gap-1.5 mb-2">
      {techStackToShow.map((tech, idx) => (
        <Badge
          key={tech}
          className={`text-xs px-2 py-1 text-white bg-white  ${colors[idx % colors.length]}`}
        >
          {capitalizeFirst(tech)}
        </Badge>
      ))}
      {remainingTech > 0 && (
        <Badge className="text-xs px-1.5 py-0.5 bg-gray-400 text-white">
          +{remainingTech}
        </Badge>
      )}
    </div>
  );
});



interface ProjectCardProps {
  project: ProjectData;
 
}

export const ProjectCard = memo(({ project}: ProjectCardProps) => {
  const { toast } = useToast();
const {openProject}= useMyProjectStore()
const {deleteProject}=useMyprojectQuery()
  const statusColors = {
    active: "border-green-500",
    published: "border-blue-500 border text-blue-500",
    draft: "border-yellow-500 border text-yellow-600",
    completed: "border-purple-500",
  };

  const handleCopyToClipboard = (text: string, message: string) => (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      navigator.clipboard.writeText(text);
      toast({ title: message });
    } catch (err) {
      toast({ title: "Failed to copy",description:`${err}`, type: "error" });
    }
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/dashboard/projects/edit/${project.id}`)
  };

  // Derived values
  const status = capitalizeFirst(project.status || "new");
  const statusColor = statusColors[status.toLowerCase() as keyof typeof statusColors] || "bg-gray-500";
  const members = project.members || [];
  const maxMembers = project.teamSize || 1;
  const roleProgress = Math.min((members.length / maxMembers) * 100, 100);
  const techStack = project.techStack || [];

  return (
    <Card
      className="overflow-hidden  cursor-pointer h-full relative hover:shadow-md transition-shadow"
      onClick={() => openProject(project.id)}
    >
      {/* Status badge */}
      <div className={`absolute top-2 right-2 px-2 py-0.5 rounded-sm text-xs font-medium ${statusColor}`}
           role="status" aria-label={`Status: ${status}`}>
        {status}
      </div>

      <div className="p-4 pb-2">
        <div className="flex items-start gap-3">
          <ProjectAvatar name={project.name} avatarUrl={project.avatar} />

          {/* Title and Actions */}
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <CardTitle className="text-base font-semibold">{project.name}</CardTitle>

              <div className="flex items-start gap-1 ml-2">
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-7 w-7 p-0"
                  onClick={handleCopyToClipboard(project.inviteCode || "", "Invite code copied!")}
                  aria-label="Copy invite code"
                >
                  <Share2 className="h-3.5 w-3.5" />
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-7 w-7 p-0"
                      onClick={(e) => e.stopPropagation()}
                      aria-label="More options"
                    >
                      <MoreHorizontal className="h-3.5 w-3.5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
                    <DropdownMenuItem onClick={handleEdit}>Edit</DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={handleCopyToClipboard(project.joinLink || "", "Join code copied!")}
                    >
                      Copy Join Code
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={()=>deleteProject(project.id)}
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            
            <CardDescription className="text-xs line-clamp-2 mt-0.5">
              {project.summary}
            </CardDescription>
          </div>
        </div>

        {/* Role Fill Bar */}
        <div className="flex justify-between text-xs mt-3 mb-1">
          <span>Role Fill</span>
          <span className="font-medium">
            {members.length}/{maxMembers}
          </span>
        </div>
        <Progress value={roleProgress} className="h-1.5 mb-2" />

        {/* Tech Stack */}
        <TechStack techs={techStack} />

        {/* Timestamps */}
        <div className="text-xs text-muted-foreground flex flex-wrap gap-3">
          <div>
            <strong>Created:</strong> {formatDate(project.createdAt)}
          </div>
          <div>
            <strong>Updated:</strong> {formatDate(project.updatedAt)}
          </div>
        </div>
      </div>

      {/* Member Avatars */}
      <div className="border-t py-2 px-4 flex justify-between items-center mt-1">
    
        
      </div>
    </Card>
  );
});