import express, { type Response }  from "express"
import Studio from "../models/studio.ts"
import z from "zod"
import Session from "../models/session.ts"
import type { AuthRequest } from "../middleware/auth.ts"
import { authMiddleware } from "../middleware/auth.ts"

const router=express.Router()

// Helper to validate MongoDB ObjectId format
const objectIdSchema = z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ID format");

export const startSessionSchema = z.object({
  body: z.object({
    studioId: objectIdSchema,
  }),
});

export const stopSessionSchema = z.object({
  params: z.object({
    sessionId: objectIdSchema,
  }),
});


router.post('/start', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    // 1. Zod Validation
    const validation = startSessionSchema.safeParse({ body: req.body });
    if (!validation.success) {
      return res.status(400).json({ error: validation.error });
    }

    const { studioId } = req.body;

    // 2. Security: Verify that the user owns this studio
    const studio = await Studio.findOne({ _id: studioId, hostId: req.userId! });
    if (!studio) {
      return res.status(403).json({ message: "You are not authorized to start a session in this studio." });
    }

    // 3. Create Session
    const newSession = await Session.create({
      studioId,
      status: 'recording',
      startTime: new Date()
    });

    res.status(201).json({
      message: "Session started successfully",
      sessionId: newSession._id,
      studioName: studio.name
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// --- STOP SESSION ---
router.patch('/:sessionId/stop', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    // 1. Zod Validation
    const validation = stopSessionSchema.safeParse({ params: req.params });
    if (!validation.success) {
      return res.status(400).json({ error: validation.error });
    }

    const { sessionId } = req.params;

    // 2. Find and Update the Session
    // We also check studioId -> hostId to ensure only the host can stop it
    const session = await Session.findById(sessionId).populate('studioId');
    
    if (!session) {
      return res.status(404).json({ error: "Session not found" });
    }

    // Type casting studioId to check ownership
    const studio = session.studioId as any; 
    if (studio.hostId.toString() !== req.userId) {
      return res.status(403).json({ error: "Unauthorized to stop this session." });
    }

    // 3. Finalize Session
    session.status = 'completed';
    session.endTime = new Date();
    await session.save();

    res.json({
      message: "Session finalized",
      duration: (session.endTime.getTime() - session.startTime.getTime()) / 1000 + " seconds"
    });

  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
