import express from "express";
import { regenerateTokens, registerUser, userDetail } from "../controllers/user.controller.js";

const router = express.Router();
router.get("/", (req, res) => {
  console.log("Welcome");
  res.send("Welcome");
});

router.post("/register", registerUser);
router.get("/me",userDetail)
router.get("/refresh",regenerateTokens)

export default router;
