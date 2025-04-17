import * as React from "react";
import { ProjectCard } from "@/components/project-card";
import { ProjectSidebar } from "@/components/project-sidebar";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import ProjectDialog from "@/components/project-createDialog";
import { useQuery } from "@tanstack/react-query";
import { getMyProject, getProjectsById } from "@/lib/api";
import { useFormStore, useMyProjectStore } from "@/store/useProjectStore";
import { TechStack } from "@/lib/schema";
import { ProjectCardData } from "@/types/project";

export interface ProjectData {
  project: {
    id: string;
    ownerId: string;
    name: string;
    summary: string;
    description: string;
    banner: string;
    avatar: string;
    category: string;
    status: string;
    ecosystem: string;
    teamSize: number;
    stage: string;
    liveUrl: string;
    inviteCode: string;
    joinLink: string;
    createdBy: string;
    createdAt: string;
    updatedAt: string;
  };
  role: {
    id: string;
    projectId: string;
    role: string;
    description: string;
    count: number;
    isRemote: boolean;
    experienceLevel: string;
  }[];
  techStack: TechStack;
  members: {
    id: string;
    name: string;
    projectId: string;
    userId: string;
    username: string;
    roleId: string | null;
    isOwner: boolean;
    joinedAt: string;
  }[];
}

// From the ProjectSidebar component
type TeamMemberStatus = "online" | "offline" | "away";

export function MyProjectsPage() {
  const { isOpen, projectId, onClose } = useMyProjectStore();
  const { clearForm } = useFormStore();
  const { data: singleProjectQuery, isLoading: projectLoading } = useQuery({
    queryKey: ["getProjectData", projectId],
    queryFn: () => getProjectsById(projectId),
    enabled: !!projectId,
    staleTime: Infinity,
    gcTime: 1000 * 60 * 30,
  });

  const { data: allProjects, isLoading } = useQuery({
    queryKey: ["datacards"],
    queryFn: getMyProject,
  });

  const selectedProject = singleProjectQuery?.data as ProjectData | undefined;

  const [open, setOpen] = React.useState(false);

  const getRandomStatus = (): TeamMemberStatus => {
    const statuses: TeamMemberStatus[] = ["online", "offline", "away"];
    return statuses[Math.floor(Math.random() * statuses.length)];
  };

  return (
    <div className="relative ">
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
     
         {isLoading  ? (
          <div>Loading projects...</div>
        ) : (
          allProjects?.data.map((project: ProjectCardData) => (
            <div key={project.id}>
              <ProjectCard project={project} />
            </div>
          ))
        )}
    
      </div>

      <ProjectSidebar
        isOpen={isOpen}
        isLoading={projectLoading}
        onClose={onClose}
        project={
          selectedProject
            ? {
                id: selectedProject.project.id,
                name: selectedProject.project.name,
                description: selectedProject.project.description,
                startDate: selectedProject.project.createdAt,
                endDate: selectedProject.project.updatedAt,
                teamMembers: selectedProject.members.map((member) => ({
                  id: member.id,
                  name: member.username,
                  role: "fullstack",
                  avatar: "/placeholder.svg?height=40&width=40",
                  status: getRandomStatus(),
                  ...(Math.random() > 0.5 && {
                    lastActive: ["5 min ago", "1 hour ago", "2 hours ago"][
                      Math.floor(Math.random() * 3)
                    ],
                  }),
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
