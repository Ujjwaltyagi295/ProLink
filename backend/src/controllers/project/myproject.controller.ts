import catchErrors from "../../utils/catchErrors";
import { db } from "../../config/db";
import projects, { NewProject } from "../../models/project.model";
import {
  CREATED,
  NOT_FOUND,
  OK,
  UNPROCESSABLE_CONTENT,
  BAD_REQUEST,
  FORBIDDEN,
} from "../../constants/http";
import { createId } from "@paralleldrive/cuid2";
import AppError from "../../utils/AppError";

import { eq, inArray } from "drizzle-orm";
import { users } from "../../models/user.model";
import { z } from "zod";
import { projectSchema } from "./project.schema";
import { NewRole, projectRoles } from "../../models/projectRoles";
import { Request, Response } from "express";
import appAssert from "../../utils/appAssert";
import slugify from "slugify";
import projectTechStack, { NewTechStack } from "../../models/projectTechStack";
import { NewMember, projectMembers } from "../../models/projectMembers";
import { projectApplications } from "../../models";

export const createProjectHandler = catchErrors(
  async (req: Request, res: Response) => {
    const { name, summary } = req.body;

    appAssert(name && summary, UNPROCESSABLE_CONTENT, "Project name required");

    const userId = req.userId;
    const [user] = await db.select().from(users).where(eq(users.id, userId));
    appAssert(user, NOT_FOUND, "User not found");

    const genJoinLink = createId();

    const projectData: NewProject = {
      name: name.trim(),
      summary: summary.trim(),
      ownerId: userId,
      joinLink: genJoinLink,
      createdBy: user.name,
    };

    const [project] = await db.insert(projects).values(projectData).returning();

    return res.status(CREATED).json(project);
  }
);

export const getAllMyProjects = catchErrors(async (req: Request, res: Response) => {
  const userId = String(req.userId);
  
  const userProjects = await db
    .select()
    .from(projects)
    .where(eq(projects.ownerId, userId));
    
  if (userProjects.length === 0) {
    return res.status(OK).json([]);
  }
  
  const projectIds = userProjects.map(project => project.id);
  
  const roles = await db
    .select()
    .from(projectRoles)
    .where(inArray(projectRoles.projectId, projectIds));
    
  const techStack = await db
    .select()
    .from(projectTechStack)
    .where(inArray(projectTechStack.projectId, projectIds));
    
  const members = await db
    .select()
    .from(projectMembers)
    .where(inArray(projectMembers.projectId, projectIds));
    const applications= await  db.select().from(projectApplications).where(inArray(projectApplications.projectId,projectIds))
 
  const result = userProjects.map(project => ({
    ...project,
    
    roles: roles.filter(role => role.projectId === project.id),
    techStack: techStack
      .filter(tech => tech.projectId === project.id)
      .map(tech => tech.techStack),
    members: members.filter(member => member.projectId === project.id),
    applications:applications.filter(a=>a.projectId===project.id)
  }));
  
  return res.status(OK).json(result);
});

export const publishProject = catchErrors(
  async (req: Request, res: Response) => {
    const projectId = String(req.params.id);
    appAssert(projectId, BAD_REQUEST, "Project ID is required");

    const userId = req.userId;
    const [existingProject] = await db.select().from(projects).where(eq(projects.id,projectId))

    appAssert(existingProject, NOT_FOUND, "Project not found");
    appAssert(
      existingProject.ownerId === userId,
      FORBIDDEN,
      "You don't have permission to update this project"
    );

    let data;
    try {
      data = projectSchema.parse(req.body);
    } catch (error) {
      if (error instanceof z.ZodError) throw error;
      throw new AppError(UNPROCESSABLE_CONTENT, "Invalid project data");
    }

    if (data.status === "published") {
      appAssert(
        data.roles && data.roles.length > 0,
        UNPROCESSABLE_CONTENT,
        "At least one role is required to publish"
      );
      appAssert(
        data.techStack && data.techStack.length > 0,
        UNPROCESSABLE_CONTENT,
        "At least one tech stack item is required to publish"
      );
    }

    const slug = slugify(data.name, { lower: true });

    const updatedProjectData: Partial<NewProject> = {
      name: data.name,
      summary: data.summary,
      description: data.description,
      banner: data.banner,
      avatar: data.avatar,
      category: data.category,
      liveUrl: String(data.liveUrl),
      teamSize:data.teamSize,
      stage: data.stage,
      status: data.status,
      ecosystem: data.ecosystem,
      applicationProcess:data.applicationProcess,
      meetingFrequency:data.meetingFrequency,
      hoursPerWeek:data.hoursPerWeek,
      timeCommitment:data.timeCommitment,
      timezonePreference:data.timezonePreference,
      
      inviteCode: `https://localhost:5132/${slug}`,
      updatedAt: new Date(),
    };
    
    const result = await db.transaction(async (tx) => {
      const [updatedProject] = await tx
        .update(projects)
        .set(updatedProjectData)
        .where(eq(projects.id, projectId))
        .returning();
    
      if (data.roles && data.roles.length > 0) {
        await tx
          .delete(projectRoles)
          .where(eq(projectRoles.projectId, projectId));
    
        const rolesData: NewRole[] = data.roles.map((role) => ({
          projectId,
          role: role.role,
          experienceLevel: role.experienceLevel,
          count: role.count,
          description: role.description,
          isRemote: role.isRemote,
        }));
    
        await tx.insert(projectRoles).values(rolesData);
      }
    
      if (data.techStack && data.techStack.length > 0) {
        const techStackData: NewTechStack[] = data.techStack.map((t) => ({
          projectId: projectId,
          techStack: t,
        }));
    
        await tx.insert(projectTechStack).values(techStackData);
      }
    
      const newMember:  NewMember = {
        userId: req.userId,
        username: updatedProject.createdBy,
       
        projectId: projectId,
        isOwner: true,
      };
    
      await tx.insert(projectMembers).values(newMember);
    
      return updatedProject;
    });
    
    return res.status(OK).json(result);
    
  }
);
export const getProjectsById = catchErrors(async (req, res) => {
  const projectId = req.params.id;
  appAssert(projectId,UNPROCESSABLE_CONTENT,"Details not found")
  const projectData = await db
    .select()
    .from(projects)
    .where(eq(projects.id, projectId))
    .limit(1);
    
  if (projectData.length === 0) {
    return res.status(NOT_FOUND).json({ message: "Project not found" });
  }
  
  
  const [roles, techStack, members,applications] = await Promise.all([
    db.select().from(projectRoles).where(eq(projectRoles.projectId, projectId)),
    db.select().from(projectTechStack).where(eq(projectTechStack.projectId, projectId)),
    db.select().from(projectMembers).where(eq(projectMembers.projectId, projectId)),
    db.select().from(projectApplications).where(eq(projectApplications.projectId,projectId))
  ]);
  
  const result = {
    project: projectData[0],
    roles: roles,
    techStack: techStack.map(tech => tech.techStack),
    members: members,
    applications:applications
  };
  
  return res.status(OK).json(result);
});
export const projectDelete= catchErrors(async(req,res)=>{
  const projectId= req.params.id
  await db.delete(projects).where(eq(projects.id,projectId))
  res.status(OK).json({message:"deleted"})
})
