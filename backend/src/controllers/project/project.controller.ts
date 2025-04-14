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

// Create Project
export const createProjectHandler = catchErrors(
  async (req: Request, res: Response) => {
    const { name } = req.body;

    appAssert(name, UNPROCESSABLE_CONTENT, "Project name required");

    const userId = req.userId;
    const [user] = await db.select().from(users).where(eq(users.id, userId));
    appAssert(user, NOT_FOUND, "User not found");

    const genJoinLink = createId();

    const projectData: NewProject = {
      name: name.trim(),
      ownerId: userId,
      joinLink: genJoinLink,
      createdBy: user.name,
    };

    const [project] = await db.insert(projects).values(projectData).returning();

    return res.status(CREATED).json(project);
  }
);

// Get Projects by User
export const getProjectsById = catchErrors(
  async (req: Request, res: Response) => {
    const userId = String(req.userId);

    const allProjects = await db.query.projects.findMany({
      where: eq(projects.ownerId, userId),
    });

    const projectData = allProjects.map((project) => ({
      id: project.id,
      name: project.name,
      createdBy: project.createdBy,
      lastUpdated: project.updatedAt,
    }));

    return res.status(OK).json(
      projectData
    );
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
    appAssert(existingProject.ownerId === userId, FORBIDDEN, "You don't have permission to update this project");

    let data;
    try {
      data = projectSchema.parse(req.body);
    } catch (error) {
      if (error instanceof z.ZodError) throw error;
      throw new AppError(UNPROCESSABLE_CONTENT, "Invalid project data");
    }

    if (data.status === "published") {
      appAssert(data.roles && data.roles.length > 0, UNPROCESSABLE_CONTENT, "At least one role is required to publish");
      appAssert(data.techStack && data.techStack.length > 0, UNPROCESSABLE_CONTENT, "At least one tech stack item is required to publish");
    }

    const slug = slugify(data.name, { lower: true });

    const updatedProjectData: Partial<NewProject> = {
      name: data.name,
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
        await tx.delete(projectRoles).where(eq(projectRoles.projectId, projectId));

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

      return updatedProject;
    });

    return res.status(OK).json({
      project: result,
      message: data.status === "published" ? "Project published successfully" : "Project updated successfully",
    });
  }
);
