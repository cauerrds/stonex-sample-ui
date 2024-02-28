import dynamic from "next/dynamic";
import { IUser } from "../database/users.types";
import { FormatHost } from "../helpers/FormatHost";
import { headers } from "next/headers";


interface getUsersDataProps {
  host: string
}

interface InteralAPIRes {
  success: boolean
  message?: string
  data?: any
}

const getUsersData = async ({host}: getUsersDataProps): Promise<IUser[] | [] > => {
  if (!host.includes('localhost')){
    return []
  } 
  const baseURL = FormatHost(host)
  const url = `${baseURL}/api/users`  
  const res =  await fetch(url)
  const {data}:InteralAPIRes = await res.json()
  return data as IUser[]
}

const UserList = dynamic(()=> import("../components/UserList/UserList").then(module => module.default))

export default async function HomePage() {
  const header = headers()
  const host = header.get('x-forwarded-host')
  const data = await getUsersData({host: host as string})
  return (
     <UserList isLocalHost={host?.includes('localhost') || true} users={data}/>
  )
}
