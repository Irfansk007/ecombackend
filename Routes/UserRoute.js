import { Router } from "express";
import { userRegister, userLogin, userAdminLogin } from "../Controllers/userLogin.js";
import { isAdmin } from "../Middlewares/isAdmin.js";
import { ProductsAdd, deleteProduct, getAllProducts, updateProduct } from "../Controllers/Products.js";
import upload from "../utils/multer.js";


const UserRoute = Router()




UserRoute.post('/register', userRegister)
UserRoute.get('/login', userLogin)


//
UserRoute.get('/admin/login', upload.any(), userAdminLogin)

UserRoute.post('/add', isAdmin, upload.fields([{name:"image"},{name:"thumbnail"}]), ProductsAdd)
UserRoute.put('/update', isAdmin, upload.fields([{name:"image"},{name:"thumbnail"}]), updateProduct)
UserRoute.delete('/delete/:id',isAdmin,deleteProduct)


UserRoute.get('/getProducts',getAllProducts)






//UserRoute.post('/add/v1',upload.fields([{name:"image"},{name:"thumbnail"}]), ProductsAdd)
export default UserRoute