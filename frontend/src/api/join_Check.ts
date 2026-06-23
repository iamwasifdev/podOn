import api from "@/lib/api";


export default async function (inviteCode:string){

  const res= await api.get(`/studio/join/${inviteCode}`)
  return res.data

}
