import  { Request, Response } from 'express';
import User from '../models/User';
import bcrypt from 'bcrypt' 
import jwt from 'jsonwebtoken'


export const loginUser=async (req:Request,res:Response)=>{
    const{email,password}=req.body
     try{
        const findUser = await User.findOne({ email });
        if(findUser){
            const confirmPassword=await bcrypt.compare(password, findUser.password);
            if(confirmPassword){
                const token = jwt.sign({ userId: findUser._id, email: findUser.email,role:findUser.role }, process.env.JWT_SECRET as string, {
                    expiresIn: '1d', // Token expiration time (adjust as needed)
                  });
          
                  // Set the token as an HTTP-only cookie
                  res.cookie('token', token, {
                    httpOnly: true,
                    maxAge: 3600000, // Cookie expiration time in milliseconds (1 hour in this case)
                  });
          
                  res.json({ findUser });
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