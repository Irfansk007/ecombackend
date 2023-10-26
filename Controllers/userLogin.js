import { prisma } from "../utils/prisma.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const jwtsecret = `${process.env.JWT_SECRET}`
export const userRegister = async (req, res) => {
    const { name, email, password } = req.body
    console.log(name,email,password)
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: email,
            }
        })
        if (user) {
            return res.status(200).json({ message: "user already exist" })

        }
        const hashedpassword = await bcrypt.hash(password, 10)
        const data = await prisma.user.create({
            data: {
                name: name,
                email: email,
                password: hashedpassword
            }
        })
        console.log(data)
        return res.status(201).json(data);
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }

}

export const userLogin = async (req, res) => {
    const { email, password } = req.body
    const content = req.body
    console.log(content)
    try {
        const userExist = await prisma.user.findFirst({
            where: {
                email: email,
            }
        })
        if (!userExist) {
            return res.status(400).json({ message: 'User not found' })
        }
        console.log(userExist,email)
        const comparePassword = await bcrypt.compare(password, userExist.password)

        if (!comparePassword) {
            return res.status(401).json({ message: "invalid password" })

        }
        const token = jwt.sign({ email }, jwtsecret, { expiresIn: '6h' })

        res.cookie('token', token)
        return res.status(200).json({ email })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }

}

export const userAdminLogin = async (req,res) => {
    const { email, password } = req.body
    console.log(email,password)

    try {
        const isAdminExist = await prisma.admin.findUnique({
            where: {
                email: email,
            }
        })
        console.log(isAdminExist)
        if (!isAdminExist) {
            return res.status(400).json({ message: "Admin not Found" })
        }

        if (password != isAdminExist.password) {
            return res.status(401).json({ message: " Wrong Password" })
        }
        
        const isAdminvalue = isAdminExist.isAdmin
        const token = await jwt.sign({ email,isAdmin:isAdminvalue }, jwtsecret, { expiresIn: "10h" })
        console.log(token)
        res.cookie('token', token)
        return res.status(200).json({ email })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}