 
 
 
import express from "express"
import { createProjectHandler, getAllMyProjects, getApplicationById, getProjectsById, projectDelete, publishProject } from "../controllers/project/myproject.controller"
import { upload, uploadToCloudinary } from "../controllers/project/fileUpload.controller"
import { cloudWare } from "../middlewares/cloudinary"

const projectRoutes= express.Router()

projectRoutes.post('/create',createProjectHandler)
projectRoutes.get("/",getAllMyProjects)
projectRoutes.get("/:id",getProjectsById)
projectRoutes.put("/:id",publishProject)
projectRoutes.delete("/:id",projectDelete)
projectRoutes.get("/application/:id",getApplicationById)
projectRoutes.post("/upload", upload.single('images'),  uploadToCloudinary,cloudWare);



export default projectRoutes