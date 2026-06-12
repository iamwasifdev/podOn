import express, { type Response } from "express";
import { type AuthRequest, authMiddleware } from "../middleware/auth.ts";
import z from "zod";
import Studio from "../models/studio.ts";
import crypto from "crypto";
import type { ObjectId } from "mongoose";

const router = express.Router();
 
router.get("/join/:inviteCode", async (req, res) => {
  const { inviteCode } = req.params;

  const studio = await Studio.findOne({ inviteCode });

  if (!studio) {
    return res.status(404).json({ message: "Studio not found" });
  }

  return res.status(200).json({ studio });
});

router.use(authMiddleware);

const createStudioSchema = z.object({
  name: z
    .string()
    .min(4, "Sorry the min length is 4 letters")
    .max(25, "Sorry the max length is 25 letters "),
});
router.post("/studios", async function (req: AuthRequest, res: Response) {
  try {
    const result = z.safeParse(createStudioSchema, req.body);

    if (!result.success) {
      return res.status(400).json({
        errorType: "syntax",
        error: result.error,
      });
    }

    const raw = crypto.randomBytes(3).toString("hex").toUpperCase();
    const inviteCode = `${raw.substring(0, 3)}-${raw.substring(3, 6)}`;
    const studio = await Studio.create({
      name: req.body.name,
      hostId: req.userId!,
      inviteCode: inviteCode,
    });
    res.json({
      studio,
    });
  } catch (error) {
    res.status(500).json({
      error: "Internal server error",
      log: error,
    });
  }
});

router.get("/studios", async function (req: AuthRequest, res: Response) {
  const studios = await Studio.find({ hostId: req.userId! });

  if (studios.length === 0) {
    return res.json({
      type: "nostudio",
      error: "No Studio Made",
    });
  }

  res.json({
    studios,
  });
});

export default router;
