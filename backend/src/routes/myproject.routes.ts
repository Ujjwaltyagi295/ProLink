 
 
 
import express from "express"
import { createProjectHandler, getAllMyProjects, getProjectsById, projectDelete, publishProject } from "../controllers/project/myproject.controller"
import { upload, uploadToCloudinary } from "../controllers/project/fileUpload.controller"
import { cloudWare } from "../middlewares/cloudinary"
import { getApplicationById, manageApplication } from "../controllers/application/application.controller"

const projectRoutes= express.Router()

projectRoutes.post('/create',createProjectHandler)
projectRoutes.get("/",getAllMyProjects)
projectRoutes.get("/:id",getProjectsById)
projectRoutes.put("/:id",publishProject)
projectRoutes.delete("/:id",projectDelete)
projectRoutes.post("/upload", upload.single('images'),  uploadToCloudinary,cloudWare);


projectRoutes.get("/application/:id",getApplicationById)

projectRoutes.post("/manage/application/",manageApplication)

export default projectRoutes