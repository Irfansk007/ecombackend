import { prisma } from '../utils/prisma.js'

export const addComment = async (req, res) => {
    const { content, userId, productId } = req.body;

    try {
        const productCheck = await prisma.products.findUnique({
            where: {
                id: productId
            }
        })
        if (!productCheck) {
            return res.status(404).json({ message: "product not found" })
        }
        const commentAdd = await prisma.comment.create({
            data: {
                content,
                userid: userId,
                productid: productId
            }
        })
        return res.status(200).json({ message: "comment added successfully" })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}


export async function commentUpdate(req,res){
 

}