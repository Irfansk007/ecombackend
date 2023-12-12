import {Router} from "express"
import upload from "../utils/multer"
import { addComment } from "../Controllers/Comments"

const commonRoute = Router()


commonRoute.post('/commentAdd',upload.any(),addComment)


export default commonRoute