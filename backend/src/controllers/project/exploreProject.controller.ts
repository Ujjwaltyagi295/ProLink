import { eq } from "drizzle-orm";
import { db } from "../../config/db";
import { OK } from "../../constants/http";
import { projectMembers } from "../../models/projectMembers";
import { projectRoles } from "../../models/projectRoles";
import { projectTechStack } from "../../models/projectTechStack";
import catchErrors from "../../utils/catchErrors";
import projects from "../../models/project.model";
export const getAllProjects = catchErrors(async (req, res) => {
  
    const projectsData = await db.select().from(projects).where(eq(projects.status,"published"));
    const techstack = await db.select().from(projectTechStack);
    const roles = await db.select().from(projectRoles);
    const members= await db.select().from(projectMembers)
    
    const allProjects = projectsData.map(project => {
      return {
        ...project,
        techStack: techstack.filter(tech => tech.projectId === project.id)
        .map(tech => tech.techStack),
        members:members.filter(member=>member.projectId===project.id),
        roles: roles.filter(role => role.projectId === project.id)
      };
    });
  
    res.status(OK).json(allProjects);
  });