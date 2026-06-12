import { AccessToken, ParticipantPermission } from "livekit-server-sdk";

import express, { type Response } from "express";
import type { AuthRequest } from "../middleware/auth";
import Studio from "../models/studio.ts";
import z from "zod";
import crypto from "crypto"
import users from "../models/users.ts";
import jwtVerify from "../functions/auth.ts";
const router = express.Router();

const inviteCodeGuestSchema = z.object({
  inviteCode: z.string().length(7, "Wrong invite Code"),
  participantName: z
    .string()
    .min(4, "Your name should be atleast 4 letters long")
    .max(13, "Your name can contain max 13 letter"),
  role:z.enum(["guest","host"])
});


const inviteCodeHostSchema = z.object({
  inviteCode: z.string().length(7, "Wrong invite Code"),
  role:z.enum(["guest","host"])
});

// Inside your route: GET /api/token
router.get(
  "/join/:inviteCode",
  async function (req: AuthRequest, res: Response) {
    const inviteCode = req.params.inviteCode as string;
    const participantName = req.query.participantName as string;
    const role=req.query.role as "guest"|"host";
    let result:any;
    let identity:string;
    let name:string;
    if(role==="guest"){

     result = z.safeParse(inviteCodeGuestSchema, {
      inviteCode,
      participantName,
      role
    });




    }
    else{

     result = z.safeParse(inviteCodeHostSchema, {
      inviteCode,
      role
    });

    }
       if(!result.success){
      return  res.json({
        errorType:"zodvalidation",
        error:result.error
      })
    }



    if(role==='guest'){
    const randomHex = crypto.randomBytes(3).toString('hex'); 
    identity = `guest_${randomHex}`; 
    name=participantName;

    }
    else{
      const authHeader = req.headers.authorization;
      
      const jwtResult=jwtVerify(authHeader)
      if(!jwtResult.success){
        return res.status(401).json({
          error:jwtResult.error
        })
      }

      const host = await users.findById(jwtResult.id)

      name=host?.username!;
      identity=jwtResult?.id?.toString()!;
    } 

    const studio = await Studio.findOne({ inviteCode });

    if (!studio) {
      return res.status(400).json({
        errorType: "wronginviteCode",
        error: "No invite code Found!",
      });
    }
    const roomName = studio._id as unknown as string;
    console.log(roomName)

    // 1. Initialize the Token generator
    const at = new AccessToken(
      process.env.LIVEKIT_API_KEY,
      process.env.LIVEKIT_API_SECRET,
      { identity,name },
    );
    const metadata={
      role
    }
    at.metadata=JSON.stringify(metadata)

    // 2. Set the Permissions
    at.addGrant({
      roomJoin: true,
      room: roomName,
      canPublish: true, // Can send their camera
      canSubscribe: true, // Can see others
    });

    // 3. Convert to a string to send to the Frontend
    const tokenString = await at.toJwt();
    res.json({ token: tokenString,studio });
  },
);


export default router
