import { ArrowRight, Clock, Users, Calendar } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";

export function FeaturedProject() {
  const project = {
    id: "project-001",
    title: "AI-Powered Resume Analyzer",
    description:
      "A web application that analyzes resumes using AI to match them with job descriptions and provide feedback to improve hiring chances.",
    thumbnail: "https://i.imgur.com/DUzsJiw.jpeg[/img]",
    category: "AI_ML",
    stage: "Beta",
    status: "Hot", // "New", "Upcoming"
    skills: [
      "Python",
      "Machine_Learning",
      "Natural_Language_Processing",
      "React",
      "FastAPI",
      "Docker",
      "PostgreSQL",
    ],
    teamSize: 5,
    timeline: "3 months",
    openPositions: 2,
  };

  return (
    <Card className="overflow-hidden border border-slate-200 bg-white text-black rounded-xl shadow-sm">
      <div className="flex flex-col md:flex-row">
        <div className="relative md:w-1/3 h-48 md:h-auto">
          <img
            src={project.thumbnail || "/placeholder.svg?height=400&width=600"}
            alt={project.title}
            className="object-cover w-full h-full"
          />
          {project.status && (
            <Badge
              className={`absolute right-2 top-2 ${
                project.status === "New"
                  ? "bg-green-500"
                  : project.status === "Hot"
                  ? "bg-blue-600"
                  : "bg-amber-500"
              }`}
            >
              {project.status}
            </Badge>
          )}
        </div>

        <div className="flex flex-col justify-between p-4 md:w-2/3">
          <div className="space-y-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="outline" className="text-xs font-normal">
                  {project.category.replace(/_/g, " ")}
                </Badge>
                <Badge variant="outline" className="text-xs font-normal">
                  {project.stage}
                </Badge>
              </div>

              <Link to={`/projects/${project.id}`} className="group">
                <h3 className="text-xl font-bold group-hover:text-blue-600 transition-colors duration-200">
                  {project.title}
                </h3>
              </Link>
            </div>

            <p className="text-gray-600 text-sm line-clamp-2">{project.description}</p>

            <div className="flex flex-wrap gap-1">
              {project.skills.slice(0, 4).map((skill) => (
                <Badge
                  key={skill}
                  variant="secondary"
                  className="text-xs bg-gray-100 text-gray-800 border-0"
                >
                  {skill.replace(/_/g, " ")}
                </Badge>
              ))}
              {project.skills.length > 4 && (
                <Badge
                  variant="secondary"
                  className="text-xs bg-gray-100 text-gray-800 border-0"
                >
                  +{project.skills.length - 4} more
                </Badge>
              )}
            </div>
          </div>

          <div className="mt-4 space-y-3">
            <div className="flex flex-wrap gap-3 text-xs text-gray-500">
              <div className="flex items-center">
                <Users className="mr-1 h-3 w-3" />
                <span>{project.teamSize}</span>
              </div>
              <div className="flex items-center">
                <Clock className="mr-1 h-3 w-3" />
                <span>{project.timeline}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="mr-1 h-3 w-3" />
                <span>{project.openPositions} open positions</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button size="sm" asChild>
                <Link to={`/projects/${project.id}`}>Apply Now</Link>
              </Button>

              <Button variant="ghost" size="sm" className="h-8 px-2" asChild>
                <Link to={`/projects/${project.id}`} className="flex items-center">
                  Details
                  <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}