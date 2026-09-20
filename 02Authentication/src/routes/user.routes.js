import express from "express";
import { loginUser, registerUser, userInfo } from "../controllers/user.controllers.js";
import authMiddleware from "../middlewere/auth.js";

const router = express.Router()

router.get("/",(req,res)=>{
    res.send('Welcome to user Routes.')
})
router.post("/register",registerUser)
router.get("/me",authMiddleware,userInfo)
router.post("/login",loginUser)

export default router;

