import express from "express"

import { filterProjects, getAllProjects, submitApplication } from "../controllers/project/project.controller"
import {  getProjectsById } from "../controllers/project/myproject.controller"
import authenticate from "../middlewares/authenticate"

const router= express.Router()

router.get("/filter",filterProjects)
router.get("/",getAllProjects)
router.get("/:id",getProjectsById)

router.post("/apply",authenticate,submitApplication)
export default router