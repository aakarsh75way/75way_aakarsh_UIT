import express, { Request, Response } from 'express';
import { addUploads } from '../controllers/addUploads';
import singleUpload from '../utils/multer';
import { extractUserRole } from '../middleware/roleMiddleware';
import { getUploads } from '../controllers/getuploads';


const router = express.Router();


//documentRoutes
router.post("/create",singleUpload,extractUserRole,addUploads)
router.get("/:id",extractUserRole,getUploads)





export default router