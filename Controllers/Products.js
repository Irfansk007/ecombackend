import { prisma } from "../utils/prisma.js"
// import s3 from "../utils/awsConnection.js";



export const ProductsAdd = async (req,res)=>{
    const {isAdmin} = req.user
    const {name,images,Categories} = req.body
    const content = req.files
    console.log(content)
//    try {
//         const upload =  await s3.upload({
//             // @ts-ignore
//             Bucket: process.env.AWS_S3_BUCKET_NAME,
//             Key: image.originalname,
//             Body: image.buffer
//         }).promise();
//       console.log(upload.Location)
//    } catch (error) {
//     return res.status(500).json({message: error.message})
//    }
}