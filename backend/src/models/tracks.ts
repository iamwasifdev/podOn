import mongoose, { Schema, Document } from 'mongoose';

export interface ITrack extends Document {
  sessionId: mongoose.Types.ObjectId;
  participantName: string;
  role: 'host' | 'guest';
  cloudinaryUrl: string;
  publicId: string; // Cloudinary's identifier
  createdAt: Date;
}

const TrackSchema: Schema = new Schema({
  sessionId: { type: Schema.Types.ObjectId, ref: 'Session', required: true },
  participantName: { type: String, required: true },
  role: { type: String, enum: ['host', 'guest'], required: true },
  cloudinaryUrl: { type: String, required: true },
  publicId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<ITrack>('Track', TrackSchema);
