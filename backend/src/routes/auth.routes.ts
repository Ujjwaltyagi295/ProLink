import express from "express"
import { loginHandler, logoutHandler, refreshHandler, signupHandler, userHandler } from "../controllers/auth/auth.controller"


const router = express.Router()
router.post("/signup",signupHandler)
router.get("/logout",logoutHandler)
router.get("/refresh",refreshHandler)
router.post("/login",loginHandler)
router.get("/getuser",userHandler)


export default router