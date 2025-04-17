 
 
 
import express from "express"
import { createProjectHandler, getAllProjects, getProjectsById, projectDelete, publishProject } from "../controllers/project/project.controller"
import { upload, uploadToCloudinary } from "../controllers/project/imageUpload.controller"
import { cloudWare } from "../middlewares/cloudinary"

const projectRoutes= express.Router()

projectRoutes.post('/create',createProjectHandler)
projectRoutes.get("/",getAllProjects)
projectRoutes.get("/:id",getProjectsById)
projectRoutes.put("/:id",publishProject)
projectRoutes.delete("/:id",projectDelete)
projectRoutes.post("/upload", upload.single('images'),  uploadToCloudinary,cloudWare);

export default projectRoutes