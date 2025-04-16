"use client";
import { CalendarIcon, Users } from "lucide-react";
import { motion } from "framer-motion";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { getMyProject } from "@/lib/api";
import { useMyProjectStore } from "@/store/useProjectStore";

interface ProjectCardProps {
project:{
  id: string
  name: string
  summary: string
  createdBy: string
  updatedAt: string
}
}

export function ProjectCard({ project }: ProjectCardProps) {
  const { openProject,isOpen } = useMyProjectStore();

  console.log("Rendering ProjectSidebar with isOpen:", isOpen);
  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: "0 10px 30px -15px rgba(0, 0, 0, 0.2)" }}
      whileTap={{ y: 0 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        className="overflow-hidden cursor-pointer"
        onClick={() => {
          openProject(project.id);
          console.log("Opening project:", project.id);
        }}
      >
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>{project.name}</CardTitle>
              <CardDescription className="mt-1">
                {project.summary}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between mb-1 text-sm">
            <span>Progress</span>
            <span className="font-medium">48%</span>
          </div>
          <Progress className="h-2 mb-4" />

          {/* <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div> */}

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CalendarIcon className="h-4 w-4" />
            <span>
              CreatedBy:{project.createdBy} - LastUpdated: {project.updatedAt}
            </span>
          </div>
        </CardContent>
        <CardFooter className="border-t pt-4 flex justify-between">
          {/* <div className="flex -space-x-2">
            {teamMembers.slice(0, 3).map((member) => (
              <Avatar
                key={member.id}
                className="border-2 border-background h-8 w-8"
              >
                <AvatarImage
                  src={member.avatar || "/placeholder.svg"}
                  alt={member.name}
                />
                <AvatarFallback>
                  {member.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
            ))}
            {teamMembers.length > 3 && (
              <div className="flex items-center justify-center h-8 w-8 rounded-full bg-muted text-xs font-medium">
                +{teamMembers.length - 3}
              </div>
            )}
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Users className="h-4 w-4 mr-1" />
            {teamMembers.length}
          </div> */}
        </CardFooter>
      </Card>
    </motion.div>
  );
}
