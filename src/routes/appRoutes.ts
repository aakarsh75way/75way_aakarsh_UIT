import express, { Request, Response } from 'express';

import { authMiddleWare } from '../middleware/authMiddleware';
import { appController } from '../controllers/appController';
;
import { userController } from '../controllers/userController';


const router = express.Router();


//appRoutes
router.post("/create",authMiddleWare,appController)
router.get("/create/:id",authMiddleWare,userController)




export default router