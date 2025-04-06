import express from "express"
import { signupHandler } from "../controllers/auth/auth.controller"


const router = express.Router()
router.post("/signup",signupHandler)




export default router