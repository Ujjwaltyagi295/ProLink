 
 
 
import express from "express"
import { createProjectHandler, getAllMyProjects, projectDelete, publishProject } from "../controllers/project/myproject.controller"
import { upload, uploadToCloudinary } from "../controllers/project/fileUpload.controller"
import { cloudWare } from "../middlewares/cloudinary"

const projectRoutes= express.Router()

projectRoutes.post('/create',createProjectHandler)
projectRoutes.get("/",getAllMyProjects)

projectRoutes.put("/:id",publishProject)
projectRoutes.delete("/:id",projectDelete)
projectRoutes.post("/upload", upload.single('images'),  uploadToCloudinary,cloudWare);



export default projectRoutes