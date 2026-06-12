import mongoose, { Schema, Document } from 'mongoose';

export interface ISession extends Document {
  studioId: mongoose.Types.ObjectId;
  startTime: Date;
  endTime?: Date;
  status: 'recording' | 'completed' | 'failed';
}

const SessionSchema: Schema = new Schema({
  studioId: { type: Schema.Types.ObjectId, ref: 'Studio', required: true },
  startTime: { type: Date, default: Date.now },
  endTime: { type: Date },
  status: { 
    type: String, 
    enum: ['recording', 'completed', 'failed'], 
    default: 'recording' 
  }
});

export default mongoose.model<ISession>('Session', SessionSchema);
