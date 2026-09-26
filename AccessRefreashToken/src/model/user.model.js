import mongoose  from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,"Username is Required."],
        minLength:3,
        maxLength:30
    },
    email:{
        type:String,
        required:[true,"Email is Required."],
        unique:true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,"Please Enter Valid Email."],
    },
    passwordHash:{
        type:String,
        required:true,
        minLength:8
    },
    refreshToken:{
        type:String
    }
})

const userModel = mongoose.model("User",userSchema)
export default userModel;