'use client'

import { useEffect, useState } from "react"
import { IUser } from "../../database/users.types"
import UserList from "../UserList/UserList"
import { userStoragedService } from "../../service/users.storaged.service"
import { usersDb } from "../../database/users"
import { useDispatch, useSelector } from "react-redux"
import { getAllUsers } from "../../redux/features/usertsActions"
import { AppDispatch, RootState } from "../../redux/store/store"
import { sortUsersByName } from "../../helpers/SortByName"
import { sortNumbersByValue } from "../../helpers/SortByValue"

export interface HomeScreenProps {
    userList?: IUser[]
}

export type filterOptions= "name" | "bank"

export const HomeScreen = ()=> {  
const [list, setList] = useState<IUser[]>();
const dispatch = useDispatch<AppDispatch>();
const users = useSelector((state: RootState)=> state.users.userList)
 useEffect(() => {
    const fetchUsers = async () => {
      const storageUsers = userStoragedService.getUsers();
      if (!storageUsers) {
        await userStoragedService.storeUsersInLocalStorage(usersDb);
        const updatedStorageUsers = userStoragedService.getUsers();
        setList(updatedStorageUsers);
      } else {
        setList(storageUsers);
      }
    };
    fetchUsers();
    dispatch(getAllUsers())
 }, []);

 
const filterData =  (filterType?: filterOptions, data?: IUser[]) =>{
  switch (filterType) {
    case 'name':
      setList(sortUsersByName(data || list as IUser[]))
      break;
    case "bank":
      setList(sortNumbersByValue(data || list as IUser[]))
      break;
    default:
      setList(list)
  }
}
    
if(users.length > 0){
    return  <UserList filterData={filterData} users={users}></UserList>
}    

return <UserList filterData={filterData} users={list} ></UserList>
}