import { useDispatch } from "react-redux";
import { HomeScreen } from "../components/HomeScreen/HomeScree";
import { userLocalService } from "../service/users.local.service";


interface getUsersDataProps {
  host: string
}

interface InteralAPIRes {
  success: boolean
  message?: string
  data?: any
}
export default async function HomePage() {
  return (
     <HomeScreen />
  )
}
