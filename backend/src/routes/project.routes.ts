 
 
 
import express from "express"
import { createProjectHandler, getAllProjects, getProjectsById, publishProject } from "../controllers/project/project.controller"

const projectRoutes= express.Router()

projectRoutes.post('/create',createProjectHandler)
projectRoutes.get("/",getAllProjects)
projectRoutes.get("/:id",getProjectsById)
projectRoutes.put("/:id",publishProject)
export default projectRoutes