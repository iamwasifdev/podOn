import { type Server, type Socket } from "socket.io";

import   type{ StudioState } from "../types";
import jwtVerify from "../functions/auth.ts";
const activeStudios = new Map<string, StudioState>();
//The way of code_error and code_success is purely done because callback do not work in postman .I am fully aware of the better aproach.
export default function setupSocket(io: Server) {

io.use((socket, next) => {
  // Extract token from client handshake data
  console.log("I got in use")
  const token = socket.handshake.headers.authorization; 

  const result=jwtVerify(token)

  if(!result.success){
      
    socket.data.role="guest";
      console.log("You are a guest")
      return next()
    }

      console.log("You are a host")

    socket.data.role="host";
    socket.data.id=result.id;
     return next()
  
    

});


  io.on("connect", (socket: Socket) => {
    console.log("✅ Connected:", socket.id);
  console.log("Role:", socket.data.role);
    socket.on("join_studio", (name: string, studioId: string) => {
      const roomExists = io.sockets.adapter.rooms.has(`${studioId}`);

      if (!(socket.data.role === "host")) {
        if (!roomExists) {
          return socket.emit("code_error", {
            event: "join_studio",
            error: "Host is not currently their",
          });
        }

        // TODO: later add code for request to the host and then allow the guest to come in

        socket.join(studioId);
       return socket.emit("code_success", {
          event: "join_studio",
        });
      }
      socket.join(studioId);

      socket.emit("code_success", {
        event: "join_studio",
      });
    });

    socket.on("start_recording", (studioId: string) => {
      if (socket.data.role === "guest") return;

      socket.to(studioId).emit("start_recording", {
        record: true,
      });
      socket.emit("code_success", {
        event: "start_recording",
      });
    });
 socket.on("stop_recording", (studioId: string) => {
      if (socket.data.role === "guest") return;

      socket.to(studioId).emit("stop_recording", {
        record: false,
      });
      socket.emit("code_success", {
        event: "stop_recording",
      });
    });


  });
}
