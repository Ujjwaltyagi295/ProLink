
import catchErrors from "../../utils/catchErrors";

import { db } from "../../config/db";
import projects, { NewProject } from "../../models/project.model";
import { CREATED,  NOT_FOUND,  OK,  UNPROCESSABLE_CONTENT } from "../../constants/http";
import { createId } from "@paralleldrive/cuid2";

import appAssert from "../../utils/appAssert";
import { eq } from "drizzle-orm";

import { users } from "../../models/user.model";


export const createProjectHandler = catchErrors(async (req, res) => {
 
  const {name}=req.body
  appAssert(name,UNPROCESSABLE_CONTENT,"Project name required")
  const [data]=await db.select().from(users).where(eq(users.id,req.userId))
  const genJoinLink = createId()

  const projectName: NewProject = {
    name: name,
    ownerId: req.userId,
    joinLink: genJoinLink,
    createdBy: data.name
  };

  const [project] = await db.insert(projects).values(projectName).returning();

  return res.status(CREATED).json(project);
});

export const getProjectsById= catchErrors(async(req,res)=>{
 
   const allProjects = await db.query.projects.findMany({
    where:eq(projects.ownerId,req.userId)
   });
  appAssert(allProjects.length>0,NOT_FOUND,"No project found")
  const projectData = allProjects.map((project) => ({
    id: project.id,
    name: project.name,
    createdBy:project.createdBy,
    lastUpdated:project.updatedAt
 
  }));
  return res.status(OK).json(projectData)
})