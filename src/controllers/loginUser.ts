import  { Request, Response } from 'express';
import User from '../models/User';
import bcrypt from 'bcrypt' 
import jwt from 'jsonwebtoken'
import { genrateToken } from '../utils/generateToken';
import { ObjectId } from 'mongoose';
interface IUser {
    _id: ObjectId;
    username: string;
    email: string;
    password: string;
    role: 'guest' | 'admin';
    uploads: string[];
  }
export const loginUser=async (req:Request,res:Response)=>{
    const{email,password}=req.body
     try{
        const findUser:IUser | null = await User.findOne({ email });
        if(findUser){
            const confirmPassword=await bcrypt.compare(password, findUser.password);
            if(confirmPassword){
                const response=  genrateToken(findUser,res) 
            }else{
                res.status(400).json({ error: 'Wrong credentials!!' });
            }
        }else{
            res.status(400).json({ error: 'You are not registered' });
        }

     }catch(err){
        console.log("err",err)

     }
     


}