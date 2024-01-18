import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongoose';
import { Response } from 'express';

interface IUser {
  _id: ObjectId;
  username: string;
  email: string;
  password: string;
  role: 'guest' | 'admin';
  uploads: string[];
}

export const genrateToken = (findUser: IUser, res: Response) => {
  // Generate access token
  const accessToken = jwt.sign(
    { userId: findUser._id, email: findUser.email, role: findUser.role },
    process.env.JWT_SECRET as string,
    { expiresIn: '1d' }
  );

  // Generate refresh token
  const refreshToken = jwt.sign(
    { userId: findUser._id, email: findUser.email, role: findUser.role },
    process.env.JWT_REFRESH_SECRET as string,
    { expiresIn: '7d' } // Adjust the expiration time as needed
  );

  // Set the access token as an HTTP-only cookie
  res.cookie('token', accessToken, {
    httpOnly: true,
    maxAge: 3600000, // Access token expiration time in milliseconds (1 hour in this case)
  });

  // Set the refresh token as an HTTP-only cookie
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000, // Refresh token expiration time in milliseconds (7 days in this case)
  });

  // Send a JSON response with the user information and tokens
  res.json({ findUser, accessToken });
};
