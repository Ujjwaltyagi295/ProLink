 
 
 
import express from "express"
import { createProjectHandler, getProjectsById } from "../controllers/project/project.controller"

const projectRoutes= express.Router()

projectRoutes.post('/create',createProjectHandler)
projectRoutes.get("/",getProjectsById)
export default projectRoutes