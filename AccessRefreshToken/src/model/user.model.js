import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        minLength:3,
        maxLength:20
    },
    email:{
       type:String,
       required:true,
       unique:true,
       match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    passwordHash:{
        type:String,
        required:true
    }
})

const UserModel = mongoose.model("User",userSchema)
export default UserModel;