import { prisma } from "../utils/prisma.js"
import path from "path"
import fs from "fs";
import {imageUrlGenerator,thumbnailGenerator} from "../utils/helperFunctions.js"
const folderpath = 'images'
const url = "http://localhost:8000/static/"
export const ProductsAdd = async (req, res) => {

    const { title, categories, description, price, stocks, brand, thumbnailUrl, imageUrl } = req.body
    console.log(req.files)
    try {
        const imagesupload  = imageUrlGenerator(imageUrl,req.files.image,url)
        const thumbnails = thumbnailGenerator(thumbnailUrl,req.files.thumbnail,url)

        const product = await prisma.products.create({
            data: {
                title,
                image: imagesupload,
                thumbnail: thumbnails,
                categories,
                price:parseInt(price),
                description,
                stocks:parseInt(stocks),
                brand
            }
        })
        return res.status(200).json({ message: "product has been added successfully" })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}


export const updateProduct = async (req, res) => {
    const { id, title, categories, description, price, stocks, brand, thumbnailUrl, imageUrl } = req.body;

    try {
       
        const imagesupload  = imageUrlGenerator(imageUrl,req.files.image,url)
        
        const thumbnails = thumbnailGenerator(thumbnailUrl,req.files.thumbnail,url)
        const imagestoremove = await prisma.products.findUnique({
            where: { id },
            select: {
                image: true
            }
        })
        if (!imagestoremove) {
            return res.status(404).json({ message: "id doesnt exist" })
        }
      
        imagestoremove?.image.forEach(x => {
            const imagepath = path.join(folderpath, x)

            fs.unlink(imagepath, (err) => {
                if (err) {
                   null
                }
                else {
                    console.log("images deleted successfully")
                }
            })
        })
        const thumbnailtoremove = await prisma.products.findUnique({
            where: { id },
            select:{
                thumbnail: true
            }

        })
      
        const thumbnailpath = path.join(folderpath, thumbnailtoremove?.thumbnail || '')
        fs.unlink(thumbnailpath, (err) => {null})
        const updatedValue = await prisma.products.update({
            where: {
                id: id,
            },
            data: {
                title,
                image: imagesupload,
                thumbnail: thumbnails,
                categories,
                price:parseInt(price),
                description,
                stocks:parseInt(stocks),
                brand
            }
        })
        return res.status(204).json({ message: "Product updated successfully" })

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const deleteProduct = async (req, res) => {
    const { id } = req.params
    console.log(id)

    try {
        const imagestoremove = await prisma.products.findUnique({
            where: { id },
            select: {
                image: true
            }
        })
        if (!imagestoremove) {
            return res.status(404).json({ message: "id doesnt exist" })
        }
        console.log(imagestoremove?.image)
        imagestoremove?.image.forEach(x => {
            const imagepath = path.join(folderpath, x)

            fs.unlink(imagepath, (err) => {
                if (err) {
                    console.error(err)
                }
                else {
                    console.log("images deleted successfully")
                }
            })
        })
        const productDelete = await prisma.products.delete({
            where: { id: id },
        })
        return res.status(200).json({ message: "product is deleted succesfully" })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}



// get all products

export const getAllProducts = async (req, res) => {
    try {
        const productList = await prisma.products.findMany()
        return res.status(200).json( productList )
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const getSingleProduct = async(req, res) =>{
    const {id} = req.params
    try {
        const product = await prisma.products.findUnique({
            where:{id}
        })
        if(!product) return res.status(404).json({message: 'Product not found'})
        return res.status(200).json(product)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }

}


