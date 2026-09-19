import express from "express"
import userRoutes from "../routes/user.routes.js"

const app = express()
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("Welcome to server!")
})
app.use("/user",userRoutes)

export default app;