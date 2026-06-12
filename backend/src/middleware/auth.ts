import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import type { ObjectId } from '../types';

// 1. Define what the JWT payload looks like
interface JwtPayload {
  id: ObjectId;
  email: string;
}

// 2. Extend the Express Request interface to include userId
// This prevents TypeScript from complaining when we do req.userId
export interface AuthRequest extends Request {
  userId?: ObjectId;
}


export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {

    // Get token from header (Format: Bearer <token>)
    const authHeader = req.header('Authorization');
    const token = authHeader?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ message: "No token, authorization denied" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;

    // Attach the userId to the request object
    req.userId = decoded.id;

    // Move to the next middleware or route handler
    next();
  } catch (error) {
    res.status(401).json({ message: "Token is not valid" });
  }
};
