import express from "express"

import { filterProjects, getAllProjects } from "../controllers/project/project.controller"

const router= express.Router()

router.get("/filter",filterProjects)
router.get("/",getAllProjects)

export default router