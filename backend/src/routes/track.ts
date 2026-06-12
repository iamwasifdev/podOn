import { z } from 'zod';
import express, { type Response } from 'express';
import { authMiddleware, type AuthRequest } from '../middleware/auth.ts';
import Track from '../models/tracks.ts';
import Session from '../models/session.ts';




  const objectIdSchema = z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ID format");

export const uploadTrackSchema = z.object({
  body: z.object({
    sessionId: objectIdSchema,
    participantName: z.string().min(1, "Participant name is required"),
    role: z.enum(['host', 'guest']),
    cloudinaryUrl: z.string().url("Invalid Cloudinary URL"),
    publicId: z.string().min(1, "Public ID is required"),
  }),
});

const router = express.Router();

router.use(authMiddleware)
/**
 * POST /api/tracks/upload
 * Purpose: Link a finalized Cloudinary video to a session.
 * This is public because Guests need to report their finished uploads too.
 */
router.post('/upload', async (req: AuthRequest, res: Response) => {
  try {
    // 1. Zod Validation
    const validation = uploadTrackSchema.safeParse({ body: req.body });
    if (!validation.success) {
      return res.status(400).json({ error: validation.error });
    }

    const { sessionId, participantName, role, cloudinaryUrl, publicId } = req.body;

    // 2. Verify the session exists and is not 'failed'
    const session = await Session.findById(sessionId);
    if (!session) {
      return res.status(404).json({ error: "Session not found." });
    }

    if (session.status === 'failed') {
       return res.status(400).json({ error: "Cannot upload tracks to a failed session." });
    }

    // 3. Save the Track
    const newTrack = await Track.create({
      sessionId,
      participantName,
      role,
      cloudinaryUrl,
      publicId,
    });

    console.log(`✅ Track saved for ${participantName} (${role}) in session ${sessionId}`);

    res.status(201).json({
      message: "Track metadata saved successfully",
      trackId: newTrack._id
    });

  } catch (error) {
    console.error("Error saving track:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * GET /api/tracks/session/:sessionId
 * Purpose: Get all video files for a specific session (For the Host's dashboard)
 */

const TrackSearchSchema=z.object({
  sessionId:objectIdSchema
})

router.get('/session/:sessionId', async (req: AuthRequest, res: Response) => {
    try {
        const validation=z.safeParse(TrackSearchSchema,req.params)
    if(!validation.success){

      res.status(400).json({
        error:validation.error
      })
    }
    const sessionId=req.params.sessionId as string
          const tracks = await Track.find({ sessionId   });
        res.json(tracks);
    } catch (error) {
        res.status(500).json({ message: "Error fetching tracks" });
    }
});

export default router;
