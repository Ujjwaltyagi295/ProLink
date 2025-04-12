 
 
 
import express from "express"
import { createProjectHandler } from "../controllers/project/project.controller"

const projectRoutes= express.Router()

projectRoutes.post('/create',createProjectHandler)
export default projectRoutes