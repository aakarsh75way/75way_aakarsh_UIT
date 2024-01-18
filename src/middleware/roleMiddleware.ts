import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
interface CustomRequest extends Request {
  decoded?: {
    userId: string;
    email: string;
    role: string;
  };
  userRole?: string;
}

export const extractUserRole = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const jwtToken = req.cookies.token;

  // Verify and decode the JWT
  jwt.verify(
    jwtToken,
    process.env.JWT_SECRET as string,
    (err: any, decoded: any) => {
      if (err) {
        // Token is expired or invalid
        if (err.name === "TokenExpiredError") {
          // Check if there is a refresh token
          const refreshToken = req.cookies.refreshToken;
          if (!refreshToken) {
            return res
              .status(401)
              .json({ error: "Token expired, and no refresh token provided" });
          }

          // Verify and decode the refresh token
          jwt.verify(
            refreshToken,
            process.env.JWT_REFRESH_SECRET as string,
            (refreshErr: any, refreshDecoded: any) => {
              if (refreshErr) {
                console.error(refreshErr);
                return res
                  .status(401)
                  .json({ error: "Refresh token is invalid" });
              }

              // Refresh the access token
              const newJwtToken = jwt.sign(
                {
                  userId: refreshDecoded.userId,
                  email: refreshDecoded.email,
                  role: refreshDecoded.role,
                },
                process.env.JWT_SECRET as string,
                { expiresIn: "15m" } // Set your desired expiration time for the new access token
              );

              // Set the new access token in the request object
              req.cookies.token = newJwtToken;

              // Continue to the next middleware or route
              next();
            }
          );
        } else {
          console.error(err);
          return res.status(401).json({ error: "Unauthorized" });
        }
      }
      else if (decoded && decoded.role) {
        req.userRole = decoded.role;
        req.decoded = decoded;
        next();
      } else {
        res.status(401).json({ error: "Unauthorized. User role not found." });
      }
    }
  );
};
