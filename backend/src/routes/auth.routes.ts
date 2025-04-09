import express from "express"
import { loginHandler, logoutHandler, refreshHandler, signupHandler } from "../controllers/auth/auth.controller"


const router = express.Router()
router.post("/signup",signupHandler)
router.get("/logout",logoutHandler)
router.get("/refresh",refreshHandler)
router.get("/login",loginHandler)



export default router