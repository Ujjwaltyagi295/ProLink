import * as React from "react";
import { ProjectCard } from "@/components/create-project/myproject-card";
import { ProjectSidebar } from "@/components/create-project/project-sidebar";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import ProjectDialog from "@/components/create-project/project-createDialog";
import { ProjectDataType, useFormStore, useMyProjectStore } from "@/store/useProjectStore";
import {  ProjectData } from "@/types/project";
import { useMyprojectQuery } from "@/services/myProjectQuery";

type TeamMemberStatus = "online" | "offline" | "away";


export function MyProjectsPage() {
  const { isOpen, projectId, onClose } = useMyProjectStore();
  const { clearForm } = useFormStore();
  const [open, setOpen] = React.useState(false);
  const {projects}= useMyprojectQuery()
  const getRandomStatus = (): TeamMemberStatus => {
    const statuses: TeamMemberStatus[] = ["online", "offline", "away"];
    return statuses[Math.floor(Math.random() * statuses.length)];
  };
  const selectedProject: ProjectData | undefined =isOpen? projects?.find((p:ProjectDataType)=>p.id===projectId):undefined

  return (
    <div className="relative  inset-0 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
      
      <div className="flex justify-between items-center mb-6">
      
        <h1 className="text-2xl font-bold">My Projects</h1>
        <Button
          onClick={() => {
            clearForm();
            setOpen(true);
          }}
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          New Project
        </Button>
      </div>

      <ProjectDialog open={open} onOpenChange={setOpen} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects &&  projects?.map((project:ProjectData) => (
          <div key={project.id}>
            <ProjectCard project={project} />
          </div>
        ))
      }
      </div>

      <ProjectSidebar
        isOpen={isOpen}
        isLoading={false}
        onClose={onClose}
        project={
          selectedProject
            ? {
                id: selectedProject.id,
                name: selectedProject.name,
                summary: selectedProject.summary,
                startDate: selectedProject.createdAt,
                endDate: selectedProject.updatedAt,
                teamMembers: selectedProject.members.map((member) => ({
                  id: member.id,
                  name: member.username,
                  role: "fullstack",
                  avatar: "/placeholder.svg?height=40&width=40",
                  status: getRandomStatus(),
                  lastActive: ["5 min ago", "1 hour ago", "2 hours ago"][
                    Math.floor(Math.random() * 3)
                  ],
                })),
                applications: [
                  {
                    id: "a1",
                    userId: "u1",
                    name: "Alex Johnson",
                    role: "Frontend Developer",
                    avatar: "/placeholder.svg?height=40&width=40",
                    appliedDate: "2023-07-15",
                    status: "pending",
                    experience: "3 years",
                  },
                  {
                    id: "a2",
                    userId: "u2",
                    name: "Maria Garcia",
                    role: "UI/UX Designer",
                    avatar: "/placeholder.svg?height=40&width=40",
                    appliedDate: "2023-07-12",
                    status: "pending",
                    experience: "5 years",
                  },
                  {
                    id: "a3",
                    userId: "u3",
                    name: "Thomas Lee",
                    role: "Backend Developer",
                    avatar: "/placeholder.svg?height=40&width=40",
                    appliedDate: "2023-07-10",
                    status: "accepted",
                    experience: "4 years",
                  },
                ],
                analytics: {
                  views: 845,
                  applications: 18,
                  rolesFilled: 3,
                  totalRoles: 5,
                  viewsHistory: [90, 105, 125, 115, 150, 180, 200],
                  applicationsHistory: [2, 3, 3, 1, 4, 3, 2],
                },
              }
            : null
        }
      />
    </div>
  );
}
