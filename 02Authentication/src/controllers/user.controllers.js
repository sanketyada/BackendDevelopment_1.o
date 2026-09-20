import Usermodel from "../model/user.model.js";
import jwt from 'jsonwebtoken'
import bcrypt from "bcrypt"

async function registerUser(req, res) {
    try {
        const { username, email, password } = req.body;

        const userExist = await Usermodel.findOne({ email })
        if (userExist) {
            return res.status(409).json({
                success: true,
                message: "UserExist ! Do Login"
            })
        }
        const hashPassword = await bcrypt.hash(password, 10)

        const createUser = await Usermodel.create({
            username, email, password: hashPassword
        })


        const token = jwt.sign({ id: createUser.id }, process.env.JWT_SECRET)

        res.status(200).json({
            success: true,
            message: "User Created Successfully!",
            data: {
                username,
                email,
                id: createUser.id
            },
            token
        })
    } catch (error) {
        console.log(error.message)
    }

}
async function loginUser(req, res) {
    try {
        const { email, password } = req.body;

        const user = await Usermodel.findOne({
            email
        })

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Please check you Credentials."
            })
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password)
        if (!isPasswordMatch) {
            return res.status(404).json({
                success: false,
                message: "Please check your credentials."
            })
        }

        const token = jwt.sign({ id: user.id },process.env.JWT_SECRET)

        return res.status(200).json({
            success: true,
            message: "Logged in Successfully.",
            data:{
                user:{
                 email:user.email,
                 username:user.username
                }
            },
            token
        })

    } catch (error) {
        console.log(error.message)
    }
}
async function userInfo(req, res) {
    // const { authorization } = req.headers;
    // const token = authorization.split(' ')[1];
    // console.log(token)

    // const data = jwt.verify(token, process.env.JWT_SECRET)
    // console.log(data)

    const user = await Usermodel.findOne({
        _id: req.id
    })
    res.status(200).json({
        success: true,
        message: "User Found....!",
        user
    })
}
export {
    registerUser,
    userInfo,
    loginUser
}