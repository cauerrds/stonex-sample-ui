'use client'
import { Button, Collapse, Container, Drawer, Flex, Modal, Paper, Text, Title } from "@mantine/core"
import { EditForm } from "../EditForm/EditForm"
import { useDisclosure } from "@mantine/hooks"
import { IUser } from "../../database/users.types"
import { Edit } from "../icons/Edit"
import { Dispatch, SetStateAction } from "react"
import { userLocalService } from "../../service/users.local.service"
import { userStoragedService } from "../../service/users.storaged.service"
import classes from './UserDrawer.module.css'
import { useDispatch } from "react-redux"
import { AppDispatch } from "../../redux/store/store"
import { getAllUsers } from "../../redux/features/usertsActions"
import { filterOptions } from "../HomeScreen/HomeScree"
import { filterList } from "../../redux/features/users"

export interface UserDrawerProps {
    drawerState: boolean
    drawerClose: () => void
    currentUser?: IUser
    userList?: IUser[]
    filterData: (filterType?: filterOptions, data?: IUser[]) => void
    currentFilter: filterOptions
}

const UserDrawer = ({drawerState, drawerClose, currentUser, userList, filterData, currentFilter}:UserDrawerProps) => {
  const [EditState, {toggle: EditTogle}] = useDisclosure(false);
  const [ModalState, {toggle: modalTogle, close: modalClose}] = useDisclosure(false);
  const dispatch = useDispatch<AppDispatch>();

  const handleDelete = async (id: string) => {
    const currentUrl = window.location.href
    if(currentUrl.includes('localhost')){      
      await userLocalService.deleteUser(currentUrl, id)
      await dispatch(getAllUsers())
      dispatch(filterList(currentFilter))
    } else {
      const newUserList= await userStoragedService.deleteUser(userList as IUser[], id)
      filterData(currentFilter, newUserList)
    }
      modalClose()
      drawerClose()
  }

    return(
    <Drawer offset={8} onClose={drawerClose} opened={drawerState} >
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
        <Button bg={'red'} onClick={modalTogle}>Delete</Button>
      </Flex>
      <Collapse in={EditState}>
        <EditForm users={userList as IUser[]} EditTogle={EditTogle} DrawerClose={drawerClose} user={{...currentUser} as IUser} filterData={filterData} currentFilter={currentFilter}/>
      </Collapse>
    </Paper>
      <Modal opened={ModalState} onClose={modalClose}>
        <Title fz={20}  ta={'center'} mb={20}>
          Delete User <Text fw={600}>{`${currentUser?.firstName} ${currentUser?.lastName}`}?</Text>
        </Title>
        <Flex justify={'space-between'}>
          <Button onClick={modalClose} >Cancel</Button>
          <Button onClick={() => {handleDelete(currentUser?.id as string)}}>Confirm</Button>
        </Flex>
      </Modal>
    </Drawer>
    )
}

export { UserDrawer }