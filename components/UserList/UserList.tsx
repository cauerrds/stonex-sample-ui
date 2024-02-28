'use client'
import { Table, Group, Text, Flex, Button, Drawer, Select} from '@mantine/core';
import { IUser } from '../../database/users.types';
import { useDisclosure } from '@mantine/hooks';
import { Dispatch, SetStateAction, useMemo, useState } from 'react';
import { UserDrawer } from '../UserDrawer/UserDrawer';
import classes from './UserList.module.css'
import { AddForm } from '../AddForm/AddForm';
import { filterOptions } from '../HomeScreen/HomeScree';

export interface UserListProps {
  users?: IUser[]
  filterData: (filterType?: filterOptions, data?: IUser[]) => void
}


const UserList = ({users, filterData}:UserListProps) => {
  const [DrawerState, {close: DrawerClose, open: DrawerOpen }] = useDisclosure(false);
  const [AddDrawerState, {close: AddDrawerClose, open: AddDrawerOpen }] = useDisclosure(false);
  const [currentUser, setCurrentUser] = useState<IUser>()
  const [currentFilter, setCurrentFilter] = useState<filterOptions>("name")
  const userList = useMemo(()=>{
    return users
  }, [users])

  const handleUserDrawer = (user: IUser) =>{
    setCurrentUser(user)
    DrawerOpen()
  }

  const handleFilter = (filter: filterOptions) => {
    filterData(filter, userList)
    setCurrentFilter(filter)
  }

  return (
    <>
    <UserDrawer currentFilter={currentFilter} currentUser={currentUser} drawerClose={DrawerClose} drawerState={DrawerState} filterData={filterData} userList={userList} />
    <Flex maw={1024} w={'full'} m={'auto'} p={16} justify={'space-between'} >
      <Button onClick={AddDrawerOpen}>Add Customer</Button>
      <Select 
        onChange={(_value, option) => setCurrentFilter(option.value as filterOptions)}
        data={[{ value: 'bank', label: 'Bank' }, { value: 'name', label: 'Name' }]}
        value={currentFilter ? currentFilter : ""}
      />
      <Drawer title='New Customer Data' position='right' onClose=   {AddDrawerClose} opened={AddDrawerState}>
          <AddForm currentFilter={currentFilter} AddDrawerClose={AddDrawerClose}  filterData={filterData} users={userList as IUser[]} />
      </Drawer>
    </Flex>
    <Table.ScrollContainer minWidth={398} maw={1024} m={'auto'} p={16} >
      <Table verticalSpacing="sm">
        <Table.Thead>
          <Table.Tr>
            <Table.Th className={classes.tableHead} onClick={() =>handleFilter('name')}>Name</Table.Th>
            <Table.Th className={classes.tableHead} onClick={() =>handleFilter('bank')}>Bank</Table.Th>
            <Table.Th>Agency</Table.Th>
            <Table.Th>Account</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {userList?.map((item) => (
            <Table.Tr className={classes.row} key={item.nickname} onClick={()=>handleUserDrawer(item)}>
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
          ))}
        </Table.Tbody>
      </Table>
    </Table.ScrollContainer>
    </>
  );
}

export default UserList