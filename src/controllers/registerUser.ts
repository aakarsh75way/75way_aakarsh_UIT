import  { Request, Response } from 'express';
import User from '../models/User';
import bcrypt from 'bcrypt' 
export const registerUser=async (req:Request,res:Response)=>{
    try {
        const { username, email, password,role} = req.body;
    
        // Check if the email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return res.status(400).json({ error: 'Email already exists' });
        }
        // Hash the password before saving it to the database
        const hashedPassword = await bcrypt.hash(password, 10);
    
        // Create a new user
        const newUser = new User({
          username,
          email,
          password: hashedPassword,
          role
        });
    
        // Save the user to the database
        await newUser.save();
    
        // Optionally, you can generate a JWT or other authentication token here
    
        res.status(201).json({ message: 'User registered successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
}