import jwt from "jsonwebtoken"
const registerUser = (req, res) => {
    const { username, email, password } = req.body;
    console.log(username)
    console.log(email)
    console.log(password)

    const token = jwt.sign({ username, email }, "SanketYadav")

    res.status(200).json({ message: "Registered Successfully", token })


}

const findUser = (req,res)=>{
    // res.send(req.body)
    const {token} = req.body;
    
    const decode = jwt.verify(token,"SanketYadav")
    res.send(decode)
    
}
export { registerUser,findUser }