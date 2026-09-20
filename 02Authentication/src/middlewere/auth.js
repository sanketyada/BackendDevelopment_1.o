import jwt from 'jsonwebtoken'
async function authMiddleware (req, res, next) {
    try {
        // const { authorization } = req.headers;
        const authHeader = req.headers.authorization;
        const token = authHeader.split(' ')[1];
       
        const data = jwt.verify(token, process.env.JWT_SECRET)
        req.id = data.id
        next()
    } catch (error) {
        console.log(error.message)
    }
}
export default authMiddleware 