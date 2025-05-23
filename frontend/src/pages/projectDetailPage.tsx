import React, { Suspense, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExternalLink, Link, MessageSquare, Share2 } from "lucide-react";
const ProjectRequirements = React.lazy(
  () => import("@/components/project-details/project-requirements")
);
const ProjectTeam = React.lazy(
  () => import("@/components/project-details/project-teams")
);
import { RoleCard } from "@/components/project-details/role-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { myprojects } from "@/lib/api";
import type { ProjectResData } from "@/types/project";
import LoadingSpinner from "@/components/loadingSpiner";
import { formatData } from "@/lib/utils";
import { ProjectSkeleton } from "@/components/skeleton-cards";
import { ApplicationDialog } from "@/components/project-details/project-application";

export function ProjectDetailPage() {
  const { id } = useParams();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["getbyid", id],
    queryFn: () => myprojects.getById(id),
    enabled: !!id,
  });
  const project: ProjectResData = data;

  const [dialogOpen, setDialogOpen] = useState(false);
  const handleApplyForRole = () => setDialogOpen(true);

  if (isLoading) return <LoadingSpinner />;
  if (isError || !project)
    return (
      <div className="flex items-center justify-center min-h-screen">
        Project not found
      </div>
    );

  const avatarColors = {
    yellow: "bg-amber-500",
    blue: "bg-blue-500",
    indigo: "bg-indigo-500",
  };
  const avatarOptions = ["yellow", "blue", "indigo"] as const;
  const avatarColor =
    avatarOptions[project.project.id.charCodeAt(0) % avatarOptions.length];

  const avatarElement = (
    <div
      className={`flex-shrink-0 h-20 w-20 md:h-24 md:w-24 items-center justify-center rounded-md border-4 border-gray-300 overflow-hidden flex ${
        project.project.avatar ? "" : avatarColors[avatarColor]
      }`}
    >
      {project.project.avatar ? (
        <img
          loading="lazy"
          src={project.project.avatar}
          alt={project.project.name}
          className="h-full w-full object-cover object-center"
        />
      ) : (
        <span className="m-auto text-lg font-semibold text-white">
          {project.project.name.charAt(0).toUpperCase()}
        </span>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      <main className="container mx-auto mt-20 md:mt-24 px-4 md:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row gap-6 items-start">
              {avatarElement}
              <div className="flex-1 space-y-3">
                <h1 className="text-2xl font-bold">{project.project.name}</h1>
                <p className="text-gray-600">{project.project.summary}</p>
                <div className="flex flex-wrap items-center gap-4 mt-2">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={"/placeholder.svg"} alt={""} />
                      <AvatarFallback>
                        {project.project.createdBy.slice(0, 1).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-gray-600">
                      {project.project.createdBy}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-sm text-gray-600 font-semibold">
                      {project.roles &&
                        project.roles.reduce(
                          (total, role) => total + role.count,
                          0
                        )}{" "}
                      Open Positions
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 mt-4 md:mt-0 w-full md:w-auto">
                <Button className="w-full md:w-auto" onClick={handleApplyForRole}>
                  Apply now
                </Button>
              </div>
            </div>
            
            {/* Tabs */}
            <Tabs defaultValue="overview">
              <TabsList className="bg-gray-100 rounded-full p-1 flex overflow-x-auto">
                <TabsTrigger
                  value="overview"
                  className="cursor-pointer rounded-full px-4 py-2 text-sm"
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger
                  value="requirements"
                  className="cursor-pointer rounded-full px-4 py-2 text-sm"
                >
                  Requirements
                </TabsTrigger>
                <TabsTrigger
                  value="team"
                  className="cursor-pointer rounded-full px-4 py-2 text-sm"
                >
                  Team
                </TabsTrigger>
              </TabsList>
              
              {/* Overview Tab */}
              <TabsContent
                value="overview"
                className="mt-6 space-y-6 animate-in fade-in-50 duration-300"
              >
                <Suspense fallback={<ProjectSkeleton />}>
                  <div>
                    <h2 className="text-2xl font-bold mb-4">
                      {project.project.name}
                    </h2>
                    <p className="text-gray-700 mb-6">
                      {project.project.description}
                    </p>
                    {project.project.banner && (
                      <div className="space-y-4 w-full">
                        <img
                          loading="lazy"
                          className="h-64 w-full rounded-md object-cover object-center border-2 border-neutral-300"
                          src={project.project.banner}
                          alt={project.project.name}
                        />
                      </div>
                    )}
                  </div>
                </Suspense>
              </TabsContent>
              
              {/* Requirements Tab */}
              <TabsContent value="requirements" className="mt-6">
                <Suspense fallback={<ProjectSkeleton />}>
                  <ProjectRequirements />
                  <div className="mt-8 space-y-4">
                    <h3 className="text-xl font-semibold">Open Roles</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {project.roles &&
                        project.roles.map((role) => (
                          <RoleCard
                            key={role.id}
                            role={role}
                            onApply={handleApplyForRole}
                          />
                        ))}
                    </div>
                  </div>
                </Suspense>
              </TabsContent>
              
              {/* Team Tab */}
              <TabsContent value="team" className="mt-6">
                <Suspense fallback={<ProjectSkeleton />}>
                  <ProjectTeam member={project.members} />
                </Suspense>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-8">
            <ApplicationDialog
              roleData={project.roles}
              open={dialogOpen}
              onOpenChange={setDialogOpen}
            />
            
            {/* TechStack Box */}
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 hover:border-blue-500 transition duration-300">
              <h3 className="text-lg font-medium mb-4">TechStack</h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack &&
                  project.techStack.map((category, idx) => (
                    <Badge
                      key={idx}
                      variant="secondary"
                      className="bg-gray-100 hover:bg-gray-200 text-gray-800"
                    >
                      {formatData(category)}
                    </Badge>
                  ))}
              </div>
              
              <h3 className="text-lg mt-5 font-medium mb-4">
                Positions
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.roles &&
                  project.roles.map((role, idx) => (
                    <Badge
                      key={idx}
                      variant="secondary"
                      className="bg-gray-100 hover:bg-gray-200 text-gray-800"
                    >
                      {formatData(role.role)}
                    </Badge>
                  ))}
              </div>
            </div>
            
            {/* LiveUrl Box */}
            {project.project.liveUrl && (
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <h3 className="text-lg font-medium mb-4">LiveUrl</h3>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() =>
                    window.open(project.project.liveUrl, "_blank")
                  }
                >
                  <Link className="mr-2 h-4 w-4" />
                  View LiveLink
                  <ExternalLink className="ml-auto h-4 w-4" />
                </Button>
              </div>
            )}
            
            {/* Contact and Share Box */}
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <MessageSquare className="mr-2 h-4 w-4" />
                Contact Owner
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}