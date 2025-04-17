import { MoreHorizontal, Share2, Users } from "lucide-react";
import { motion } from "framer-motion";
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
import { useMyProjectStore } from "@/store/useProjectStore";
import { ProjectCardData } from "@/types/project";
import { useToast } from "@/hooks/use-toast";
import { capitalizeFirst, formatDate } from "@/lib/utils";
import { navigate } from "@/lib/navigation";
import { deleteProject } from "@/lib/api";

interface ProjectCardProps {
  project: ProjectCardData;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const { openProject, setIsEditing } = useMyProjectStore();
  const { toast } = useToast();

  const stopEvent = (e: React.MouseEvent) => {
   
    e.stopPropagation();
  };
  const handleDelete = () => {
    deleteProject(project.id)
    window.location.reload();

  };
  const handleEdit=()=>{
    setIsEditing(true);
  
    navigate(`/dashboard/projects/edit/${project.id}`);
  }
  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();

  const getTechBorderColor = (index: number) => {
    const colors = ["border-purple-500", "border-blue-500", "border-green-500"];
    return colors[index % colors.length];
  };

  const handleCopyInviteCode = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(project.inviteCode || "");
    toast({ title: "Invite code copied!" });
  };
  const handleJoinCode = (e: React.MouseEvent) => {
    console.log(e);
    e.stopPropagation();
    navigator.clipboard.writeText(project.joinLink || "");
    toast({ title: "Join code copied!" });
  };

  const getStatusColor = (status: string) => {
    switch (capitalizeFirst(status)) {
      case "Active":
        return "bg-green-500";
      case "Published":
        return "border-blue-500 border text-blue-500";
      case "Pending":
        return "bg-yellow-500";
      case "Completed":
        return "bg-purple-500";
      default:
        return "bg-gray-500";
    }
  };

  const formattedCreatedAt = formatDate(project.createdAt);
  const formattedUpdatedAt = formatDate(project.updatedAt);
  const techStackToShow = project.techStack?.slice(0, 4) || [];
  const remainingTech =
    (project.techStack?.length || 0) - techStackToShow.length;
  const members = project.members || [];
  const maxMembers = project.teamSize || 1;
  const roleProgress = Math.min((members.length / maxMembers) * 100, 100);

  return (
    <motion.div
      whileHover={{ y: -3, boxShadow: "0 8px 20px -10px rgba(0, 0, 0, 0.2)" }}
      whileTap={{ y: 0 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <Card
        className="overflow-hidden cursor-pointer h-full relative"
        onClick={() => openProject(project.id)}
      >
        {/* Status badge */}
        <div
          className={`absolute top-2 right-2 px-2 py-0.5 rounded-sm text-xs  font-medium ${getStatusColor(
            capitalizeFirst(project.status)
          )}`}
        >
          {capitalizeFirst(project.status) || "New"}
        </div>

        <div className="p-4 pb-2">
          <div className="flex items-start gap-3">
            {/* Avatar */}
            <Avatar className="h-12 w-12 border border-gray-200 shadow-sm rounded-md">
              <AvatarImage
                src={project.avatar || "/placeholder.svg"}
                alt={project.name}
              />
              <AvatarFallback className="rounded-md">
                {getInitials(project.name)}
              </AvatarFallback>
            </Avatar>

            {/* Title + Actions */}
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <CardTitle className="text-base font-semibold">
                  {project.name}
                </CardTitle>

                <div className="flex items-start gap-1 ml-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-7 w-7 p-0"
                    onClick={handleCopyInviteCode}
                  >
                    <Share2 className="h-3.5 w-3.5" />
                  </Button>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-7 w-7 p-0"
                        onClick={stopEvent}
                      >
                        <MoreHorizontal className="h-3.5 w-3.5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" onClick={stopEvent}>
                      <DropdownMenuItem   onClick={(e) => {
                          stopEvent(e);
                          handleEdit();
                        }}>
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={(e) => {
                          stopEvent(e);
                          handleDelete();
                        }}
                      >
                        Delete
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={handleJoinCode}>
                        Copy Join Code
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
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{ originX: 0 }}
          >
            <Progress value={roleProgress} className="h-1.5 mb-2" />
          </motion.div>

          {/* Tech Stack Badges */}
          <div className="flex flex-wrap gap-1.5 mb-2">
            {techStackToShow.map((tech, idx) => (
              <Badge
                key={tech}
                className={`text-xs px-1.5 py-0.5 bg-white text-black ${getTechBorderColor(
                  idx
                )}`}
              >
                {tech}
              </Badge>
            ))}
            {remainingTech > 0 && (
              <Badge className="text-xs px-1.5 py-0.5 bg-gray-400 text-white">
                +{remainingTech}
              </Badge>
            )}
          </div>

          {/* Timestamps */}
          <div className="text-xs text-muted-foreground flex flex-wrap gap-3">
            <div>
              <strong>Created:</strong> {formattedCreatedAt}
            </div>
            <div>
              <strong>Updated:</strong> {formattedUpdatedAt}
            </div>
          </div>
        </div>

        {/* Member Avatars */}
        <div className="border-t py-2 px-4 flex justify-between items-center mt-1">
          <div className="flex -space-x-2 max-w-[55%] overflow-hidden">
            {members.slice(0, 4).map((member) => (
              <Avatar
                key={member.id}
                className="border-2 border-background h-6 w-6"
              >
                <AvatarImage src={"/placeholder.svg"} alt={member.username} />
                <AvatarFallback>{getInitials(member.username)}</AvatarFallback>
              </Avatar>
            ))}
            {members.length > 4 && (
              <div className="flex items-center justify-center h-6 w-6 rounded-full bg-muted text-xs font-medium">
                +{members.length - 4}
              </div>
            )}
          </div>

          <div className="flex items-center text-xs text-muted-foreground">
            <Users className="h-3.5 w-3.5 mr-1" />
            {members.length}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
