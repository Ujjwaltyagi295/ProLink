import express from "express"

import { filterProjects, getAllProjects } from "../controllers/project/project.controller"
import { getProjectsById } from "../controllers/project/myproject.controller"

const router= express.Router()

router.get("/filter",filterProjects)
router.get("/",getAllProjects)
router.get("/:id",getProjectsById)
export default router