 
 
 
import express from "express"
import { createProjectHandler, getProjectsById, publishProject } from "../controllers/project/project.controller"

const projectRoutes= express.Router()

projectRoutes.post('/create',createProjectHandler)
projectRoutes.get("/",getProjectsById)
projectRoutes.put("/:id",publishProject)
export default projectRoutes