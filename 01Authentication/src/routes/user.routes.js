import express from "express"
import { registerUser,findUser } from "../controllers/user.controllers.js"

const router = express.Router()

router.post("/", registerUser)
router.get("/findUser",findUser)

export default router;