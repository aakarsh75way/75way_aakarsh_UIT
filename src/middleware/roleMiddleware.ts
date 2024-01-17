import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken'
interface CustomRequest extends Request {
    decoded?: {
      userId: string;
      email: string;
      role: string;
    };
    userRole?: string; 
  }

export const extractUserRole = (req: CustomRequest, res: Response, next: NextFunction) => {
    const jwtToken = req.cookies.token;

    // Verify and decode the JWT
    jwt.verify(jwtToken,process.env.JWT_SECRET as string, (err: any, decoded: any) => {
      if (err) {
        console.error(err);
        return res.status(401).json({ error: 'Unauthorized' });
      }

  if (decoded && decoded.role) {
    req.userRole = decoded.role;
    req.decoded=decoded
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized. User role not found.' });
  }
});
}
