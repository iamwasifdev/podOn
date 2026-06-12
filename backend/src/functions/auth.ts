
import jwt  from "jsonwebtoken"

import type { ObjectId } from '../types';
interface JwtPayload {
  id: ObjectId;
  email: string;
}

export default function jwtVerify(rawToken:string |undefined){

  try {

    // Get token from header (Format: Bearer <token>)
    const token = rawToken?.replace('Bearer ', '');

    if (!token) {
      return { success:false, error: "No token, authorization denied" }
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;

    // Attach the userId to the request object

    return   {success:true,id:decoded.id}
    // Move to the next middleware or route handler
  } catch (error) {
   return { success:false, error: "Token is not valid" }
  }

}
