import express,  {  type Application, type Request, type  Response } from 'express';
import http from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.ts'
import studioRoutes from './routes/studio.ts'
import livekitRoutes from './routes/livekit.ts'
import sessionRoutes from './routes/session.ts'
import trackRoutes from './routes/track.ts'
import type { type } from 'os';

// Load environment variables
dotenv.config();

const app: Application = express();
const server = http.createServer(app);

// Initialize Socket.io with CORS
const io = new Server(server, {
  cors: {
    origin: "*", // In production, replace with your frontend URL
    methods: ["GET", "POST"]
  }
});


// Middleware
app.use(cors());
app.use(express.json());

// // --- Basic Routes ---
app.get('/', (req: Request, res: Response) => {
  res.send('Riverside Clone Backend API is running...');
});

// Import your route files here (Example)
// import authRoutes from './routes/auth';
// import studioRoutes from './routes/studios';
// import livekitRoutes from './routes/livekit';

 app.use('/api/auth', authRoutes);
 app.use('/api/studio', studioRoutes);
 app.use('/api/livekit', livekitRoutes);
 app.use('/api/session',sessionRoutes )
 app.use('/api/tracks',trackRoutes)

// --- Database & Server Start ---
const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/riverside-clone';

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log('🍀 MongoDB Connected');
    server.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('🔥 Database connection error:', err);
  });

