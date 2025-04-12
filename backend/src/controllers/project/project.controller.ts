import { z } from "zod";
import catchErrors from "../../utils/catchErrors";

import { db } from "../../config/db";
import projects, { NewProject } from "../../models/project.model";
import { CREATED,  UNPROCESSABLE_CONTENT } from "../../constants/http";
import { createId } from "@paralleldrive/cuid2";

import { getUserHandler } from "../auth/user.controller";
import appAssert from "../../utils/appAssert";


export const createProjectHandler = catchErrors(async (req, res) => {
 
  const {name}=req.body
  appAssert(name,UNPROCESSABLE_CONTENT,"Project name required")
  const data=  getUserHandler
  const genJoinLink = createId()

  const projectName: NewProject = {
    name: name,
    ownerId: req.userId,
    joinLink: genJoinLink,
    createdBy: data.name
  };

  const [project] = await db.insert(projects).values(projectName).returning();

  return res.status(CREATED).json({project: project });
});
