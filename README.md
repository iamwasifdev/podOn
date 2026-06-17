# podOn

An Riverside alternative by a kid

# 🎙️ podOn

> **Professional Multi-track Remote Recording Studio.**

podOn is a high-fidelity, resilient recording platform designed to capture studio-quality audio and 4K video from anywhere in the world. Built with the "Riverside Architecture," it prioritizes local recording over network streams to ensure zero data loss and crystal-clear quality regardless of internet fluctuations.

---

## 🏗️ The Architecture (The Riverside Secret)

Most video apps (Zoom/Meet) record the _compressed internet stream_, which leads to glitches and blur. **podOn** works differently:

1.  **Dual-:Stream System**:
    - **Live Stream**: Powered by **LiveKit (SFU)** for low-latency communication.
    - **Local Track**: Captured via **MediaRecorder API** directly from the hardware source in the browser.
2.  **Resilient Chunking**: Video is recorded in 10-second blobs and uploaded progressively to **Cloudinary**.
3.  **Automatic Stitching**: Cloudinary's "Upload Large" API stitches chunks into a single high-quality file using a unique `X-Unique-Upload-Id`.
4.  **State Persistence**: A custom **Socket.io State Map** manages the "Brain" of the studio (Lobby, Approval, Recording Sync).

---

## 🛠️ Tech Stack

### **Frontend**

- **Framework**: React 18 + Vite (TypeScript)
- **Styling**: Tailwind CSS + shadcn/ui (Rhea Style / Violet Theme)
- **RTC**: LiveKit SDK
- **Communication**: Socket.io-client & Axios
- **Icons**: Lucide React

### **Backend**

- **Runtime**: Node.js + Express (TypeScript)
- **Database**: MongoDB (Mongoose)
- **Real-time**: Socket.io (State-managed)
- **Security**: JWT (JSON Web Tokens) & BcryptJS
- **Validation**: Zod (Schema-based validation)

---

## 🚀 Getting Started

### 1. Prerequisites

- Node.js (v18+)
- MongoDB Atlas account
- Cloudinary account
- LiveKit Cloud project

### 2. Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/podon.git

# Install Backend dependencies
cd backend
npm install

# Install Frontend dependencies
cd ../frontend
npm install
```
