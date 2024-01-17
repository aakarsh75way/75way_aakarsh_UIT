// utils/verifyToken.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';


interface CustomRequest extends Request {
    apiKey?: string;
  }
  interface CustomRequest extends Request {
    decoded?: {
      userId: string;
      email: string;
      role: string;
    };
  }

export const authMiddleWare = (req: CustomRequest, res: Response, next: NextFunction) => {
  const jwtToken = req.cookies.token;

  // Verify and decode the JWT
  jwt.verify(jwtToken, process.env.JWT_SECRET as string, (err: any, decoded: any) => {
    if (err) {
      console.error(err);
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Check if the decoded JWT contains admin role
    if (decoded && decoded.role === 'admin') {
      // Generate a unique API key
      const apiKey = crypto.randomBytes(16).toString('hex');
      
      // Set the apiKey ißn the request object
      req.apiKey = apiKey;

      // Continue to the next middleware or route
      next();
    }else if(decoded && decoded.role === 'guest'){
      req.decoded=decoded
      next()
    }else {
      res.status(403).json({ error: 'Forbidden. Only admin can create apps.' });
    }
  });
};
