import express from "express"

import { filterProjects } from "../controllers/project/filterProject.controller"

const router= express.Router()

router.get("/",filterProjects)

export default router