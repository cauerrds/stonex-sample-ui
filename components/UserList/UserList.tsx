'use client'
import { Table, Group, Text, Collapse, Drawer, Paper, Container, Flex, Button, Modal, Title, } from '@mantine/core';
import { IUser } from '../../database/users.types';
import { useDisclosure } from '@mantine/hooks';
import { useMemo, useState } from 'react';
import { Edit } from '../icons/Edit';
import { EditForm } from '../EditForm/EditForm';
import { userLocalService } from '../../service/users.local.service';
import { userStoragedService } from '../../service/users.storaged.service';
import { usersDb } from '../../database/users';
import  classes  from './UserList.module.css'

export interface UserListProps {
  users: IUser[]
}
const UserList = ({users}:UserListProps) => {
  const [DrawerState, {close: DrawerClose, open: DrawerOpen }] = useDisclosure(false);
  const [EditState, {toggle: EditTogle}] = useDisclosure(false);
  const [ModalState, {toggle: ModalTogle, close: ModalClose}] = useDisclosure(false);
  const [currentUser, setCurrentUser] = useState<IUser>()
  const [userData, setUserData ] = useState(users)

  const userList = useMemo(()=>{
    if(Array.isArray(userData)){
      if(userData.length > 0) return userData
    } 
    const storageUsers = userStoragedService.getUsers()
    if(storageUsers){
      console.log('storageUsers');
      
      return storageUsers
    } 

    userStoragedService.storeUsersInLocalStorage(usersDb)
    console.log('usersDb');

    return usersDb

  }, [userData])


  const handleUserDrawer = (user: IUser) =>{
    setCurrentUser(user)
    DrawerOpen()
  }

  const handleDelete = async (id: string) => {
    const currentUrl = window.location.href
    if(currentUrl.includes('localhost')){      
      userLocalService.deleteUser(currentUrl, id)
    } else {
      const newUserList= await userStoragedService.deleteUser(userList, id)
      setUserData(newUserList)
    }
      ModalClose()
      DrawerClose()
  }

  const rows = userList?.map((item) => (
    <Table.Tr key={item.nickname} onClick={()=>handleUserDrawer(item)}>
      <Table.Td>
        <Group gap="sm">
          <div>
            <Text fz="sm" fw={500}>
              {item.nickname}
            </Text>
            <Text fz="xs" c="dimmed">
              {item.email}
            </Text>
          </div>
        </Group>
      </Table.Td>
      <Table.Td>
        <Text>
          {item.bank}
        </Text>
      </Table.Td>
      <Table.Td>
        {item.agencyNumber}
      </Table.Td>
      <Table.Td>
        <Text>
          {item.accountNumber}
        </Text>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <>
   
    <Drawer offset={8} onClose={DrawerClose} opened={DrawerState}>
      <Paper p="md" shadow="md">
      <Container>
        <Text className={classes.name} pb={4} mb={20} fz={20}>{currentUser?.firstName}<span style={{fontSize: '14px'}}>{` '${currentUser?.nickname}' `}</span>{currentUser?.lastName}</Text>
        <Container className={classes.info}>
          <Text> <span>Bank:</span> {currentUser?.bank}</Text>
          <Text> <span>Agency:</span> {currentUser?.agencyNumber}</Text>
          <Text> <span>Account:</span> {currentUser?.accountNumber}</Text>
          <Text> <span>City:</span> {currentUser?.city}</Text>
          <Text> <span>Document:</span> {currentUser?.document}</Text>
          <Text> <span>Contact:</span> {currentUser?.phone}</Text>
          <Text> <span>Email:</span> {currentUser?.email}</Text>
        </Container>
      </Container>
      <Flex w={'full'} justify={'end'} style={{zIndex: 1}}>
        <Button bg={'white'} onClick={EditTogle}><Edit/></Button>
        <Button bg={'red'} onClick={ModalTogle}>Delete</Button>
      </Flex>
      <Collapse in={EditState}>
          { EditState  &&
            <EditForm users={userList} EditTogle={EditTogle} DrawerClose={DrawerClose} user={{...currentUser} as IUser} setUserData={setUserData} />
          }
      </Collapse>
    </Paper>
      <Modal opened={ModalState} onClose={ModalClose}>
        <Title fz={20}  ta={'center'} mb={20}>
          Delete User <Text fw={600}>{`${currentUser?.firstName} ${currentUser?.lastName}`}?</Text>
        </Title>
        <Flex justify={'space-between'}>
          <Button onClick={ModalClose} >Cancel</Button>
          <Button onClick={() => {handleDelete(currentUser?.id as string)}}>Confirm</Button>
        </Flex>
      </Modal>
    </Drawer>
    <Table.ScrollContainer minWidth={430}>
      <Table verticalSpacing="sm">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Name</Table.Th>
            <Table.Th>Bank</Table.Th>
            <Table.Th>Agency</Table.Th>
            <Table.Th>Account</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Table.ScrollContainer>
    </>
  );
}

export default UserList