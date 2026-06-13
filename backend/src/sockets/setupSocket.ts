
import  { type Server, type Socket } from "socket.io";
 
import { type StudioState } from "../types";
const activeStudios = new Map<string, StudioState>();

export default function setupSocket(io:Server){

  io.on("connect",(socket:Socket)=>{
 socket.on("join_studio",(studioId:string,name:string,id:string)=>{
 if(socket.data.role === "host"){
      

        if(activeStudios.has(studioId)){

         const studio= activeStudios.get(studioId)
        
          if(!studio || !studio.host )return;

          studio.host.socketId=socket.id;

        
        }
        else{
          activeStudios.set(`${studioId}`,{
           studioId,
           host:{name,socketId:socket.id,identity:id,isRecordingReady:false,uploadProgress:0},
          isRecording:false,
          participants:null



          })
        }

      }
      else{
        return;
      }
      
    })

    

  socket.on("request_access",(name:string,studioId:string)=>{

if(!studioId || !name)return ;

  const isStudio=activeStudios.has(`${studioId}`)

    if(!isStudio){
      return
    }
      const studio=activeStudios.get("studioId")
 

      
      //it should  return a callback but not know because it gives error when tested with postman
      if(!studio || !studio.host)return ;



    io.to(studio.host.socketId).emit("approve_guest",{
        name
      })




    
  })


  })
}
