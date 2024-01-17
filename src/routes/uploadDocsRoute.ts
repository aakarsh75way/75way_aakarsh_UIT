import express, { Request, Response } from 'express';
import { addUploads } from '../controllers/addUploads';
import singleUpload from '../utils/multer';
import { extractUserRole } from '../middleware/roleMiddleware';
import { docsUpload } from '../controllers/docsUpload';



const router = express.Router();
//uploadDocsRoutes
router.post("/create/:id",singleUpload,extractUserRole,docsUpload)
export default router