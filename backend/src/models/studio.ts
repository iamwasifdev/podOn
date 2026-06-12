import mongoose, { Schema, Document } from "mongoose";

export interface IStudio extends Document {
  name: string;
  hostId: mongoose.Types.ObjectId;
  inviteCode: string; // e.g., "XYZ-123"
  createdAt: Date;
}

const StudioSchema: Schema = new Schema({
  name: { type: String, required: true },
  hostId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  inviteCode: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IStudio>("Studio", StudioSchema);
