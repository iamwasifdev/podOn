import type mongoose from "mongoose";
import type { Socket } from "socket.io";

export type ObjectId=mongoose.Types.ObjectId


export interface Participant {
  socketId: string;
  identity: string;   // "guest_f3a21b"
  name: string;       // "John"
  isRecordingReady: boolean; // Did they pass the hardware check?
  uploadProgress: number;    // 0 to 100
}

export interface StudioState {
  studioId: string;          // MongoDB Studio ID
  host: Participant | null;
  isRecording: boolean;
  
  // People who have been APPROVED and are in the video call
  participants: Map<string, Participant>|null; 
  
  // People who are at the door (Lobby) waiting for approval
}
