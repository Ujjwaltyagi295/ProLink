import { z } from "zod";
import catchErrors from "../utils/catchErrors";
import { projectSchema } from "./project.schema";
import { db } from "../config/db";
import projects, { NewProject } from "../models/project.model";
import { CREATED } from "../constants/http";

export const createProjectHandler= catchErrors(async(req,res)=>{
    const data= projectSchema.parse({...req.body})
    const date=new Date(Date.now())
    const newProject:NewProject={
        userId:req.userId,
        projectName:data.projectName,
        updatedAt:date,
    }
    const [project]= await db.insert(projects).values(newProject).returning()
    res.status(CREATED).json(project)
}) 
