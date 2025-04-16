import catchErrors from "../../utils/catchErrors";
import { db } from "../../config/db";
import projects, { NewProject } from "../../models/project.model";
import {
  CREATED,
  NOT_FOUND,
  OK,
  UNPROCESSABLE_CONTENT,
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
  FORBIDDEN,
} from "../../constants/http";
import { createId } from "@paralleldrive/cuid2";
import AppError from "../../utils/AppError";

import { eq } from "drizzle-orm";
import { users } from "../../models/user.model";
import { z } from "zod";
import { projectSchema } from "./project.schema";
import { NewRole, projectRoles } from "../../models/projectRoles";
import { Request, Response } from "express";
import appAssert from "../../utils/appAssert";
import slugify from "slugify"; // Make sure to install: npm i slugify
import { NewTechStack, projectTechStack } from "../../models/projectTechStack";
import { NewMember, projectMembers } from "../../models/projectMembers";

// Create Project
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

// Get Projects by User
export const getAllProjects = catchErrors(
  async (req: Request, res: Response) => {
    const userId = String(req.userId);

    const allProjects = await db.query.projects.findMany({
      where: eq(projects.ownerId, userId),
    });

    return res.status(OK).json(allProjects);
  }
);

// Publish or Update Project
export const publishProject = catchErrors(
  async (req: Request, res: Response) => {
    const projectId = String(req.params.id);
    appAssert(projectId, BAD_REQUEST, "Project ID is required");

    const userId = req.userId;
    const existingProject = await db.query.projects.findFirst({
      where: eq(projects.id, projectId),
    });

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
      liveUrl: data?.liveUrl,
      stage: data.stage,
      status: data.status,
      ecosystem: data.ecosystem,
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
        const techData= await tx.insert(projectTechStack).values(techStackData).returning()
      }
      const newMember:NewMember={
        userId:req.userId,
        username:updatedProject.createdBy,
        projectId:projectId,
        isOwner:true,

      }
      const techMembers= await tx.insert(projectMembers).values(newMember).returning()

      return updatedProject;
      
    });

    return res.status(OK).json(updatedProjectData);
  }
);
export const getProjectsById= catchErrors(async(req,res)=>{
  const projectID= req.params.id
  const rawResults = await db
  .select({
    project: projects,
    role: projectRoles,
    techStack: projectTechStack,
    members: projectMembers
  })
  .from(projects)
  .leftJoin(projectRoles, eq(projectRoles.projectId, projectID))
  .leftJoin(projectMembers, eq(projectMembers.projectId, projectID))
  .leftJoin(projectTechStack, eq(projectTechStack.projectId, projectID))
  .where(eq(projects.id, projectID));

// Assuming all rows have same project, role, techStack
const firstRow = rawResults[0];

const grouped = {
  project: firstRow.project,
  role: firstRow.role,
  techStack: firstRow.techStack,
  members: rawResults.map((row) => row.members).filter(Boolean), // remove nulls
};


return res.status(OK).json(grouped)
})