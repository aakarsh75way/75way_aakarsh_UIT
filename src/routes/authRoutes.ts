import express, { Request, Response } from 'express';
import { registerUser } from '../controllers/registerUser';
import { loginUser } from '../controllers/loginUser';

const router = express.Router();


//authRoutes
router.post("/register",registerUser)
router.post("/login",loginUser)



export default router