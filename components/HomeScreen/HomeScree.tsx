'use client'

import { useEffect, useMemo, useState } from "react"
import { IUser } from "../../database/users.types"
import UserList from "../UserList/UserList"
import { userStoragedService } from "../../service/users.storaged.service"
import { usersDb } from "../../database/users"

export interface HomeScreenProps {
    userList: IUser[]
}
export const HomeScreen = ({userList}:HomeScreenProps)=> {  
 const [list, setList] = useState<IUser[] | undefined >();

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
 }, []);
    
if(userList){
    return  <UserList setList={setList} users={userList} ></UserList>
}    

return <UserList setList={setList} users={list} ></UserList>
}