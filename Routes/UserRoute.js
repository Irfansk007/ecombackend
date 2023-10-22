import { Router } from "express";
import { userRegister,userLogin ,userAdminLogin} from "../Controllers/userLogin.js";
import { isAdmin } from "../Middlewares/isAdmin.js";
import { ProductsAdd } from "../Controllers/Products.js";
import upload from "../utils/multer.js";

const UserRoute  = Router()


UserRoute.post('/register',userRegister)
UserRoute.get('/login',userLogin)


//
UserRoute.get('/admin/login', upload.any(),userAdminLogin)

UserRoute.post('/add',isAdmin,upload.array('image',6),ProductsAdd)


export default UserRoute