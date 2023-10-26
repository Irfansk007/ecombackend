
import jwt from "jsonwebtoken"
const jwt_secret = process.env.JWT_SECRET

export const isAdmin = async (req, res, next) => {
    const { token } = req.cookies
   

    try {
        const isAdminContent = await jwt.verify(token, `${jwt_secret}`)
        // @ts-ignore
        const isAdminvalue = isAdminContent.isAdmin
       if(!isAdminvalue){
        return res.status(403).json({message:"Access denied"})
       }
        req.user = isAdminContent
        next()

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ message: error.message })
    }
}