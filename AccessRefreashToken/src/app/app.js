import express from "express"
import cookieParser from "cookie-parser"
const app = express()
import userRouter from "../routes/user.routes.js"

app.use(express.json())
app.use(cookieParser())


app.get("/",(req,res)=>{
    res.send("Your Server is Running.")
})

app.use("/api/auth",userRouter)

export default app;