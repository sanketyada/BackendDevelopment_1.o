import express from "express";
import userRouter from "../routes/user.routes.js"

const app = express()
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("Server is Running.")
})
app.use("/user",userRouter)

export default app;
