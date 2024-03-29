'use client'
import { TextInput, Button, Group, Box } from '@mantine/core';
import { useForm } from '@mantine/form';
import { Dispatch, SetStateAction } from 'react';
import { userLocalService } from '../../service/users.local.service';
import { IUser } from '../../database/users.types';
import { userStoragedService } from '../../service/users.storaged.service';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store/store';
import { getAllUsers } from '../../redux/features/usertsActions';
import { filterOptions } from '../HomeScreen/HomeScree';
import { filterList } from '../../redux/features/users';

export interface EditFormProps {
  user: IUser,
  filterData: (filterType?: filterOptions, data?: IUser[]) => void
  currentFilter: filterOptions
  DrawerClose: () => void
  EditTogle: () => void
  users: IUser[]
}

const EditForm = ({user, filterData, DrawerClose, EditTogle, users, currentFilter}: EditFormProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const form = useForm({
    initialValues: {
        city: user.city || "  ",
        email: user.email || "  ",
        nickname: user.nickname || "  ",
        phone: user.phone ||  "  "
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      nickname: (value) => value.length < 3 ? 'Nickname must have at least 2 letters' : null,
      phone: (value) => /^(\(\d{2}\)\s?)?\d{5}-\d{4}$|^0?\d{11}$|^11\d{10}$/.test(value) ? null : 'Invalid phone number',
      city:  (value) => value.length < 1 ? 'City must have at least 1 letter' : null
    },
  });

  const handleSubmit = async (editedUser: IUser) => {
    const currentUrl = window.location.href
    if(currentUrl.includes('localhost')){
      await userLocalService.editUser(currentUrl, editedUser)
      const res = await dispatch(getAllUsers())
      dispatch(filterList(currentFilter))
    } else {
      const newUserList = await userStoragedService.editUser(users, editedUser)
      filterData(currentFilter, newUserList)
    }
    DrawerClose()
    EditTogle()
    
    return
  }

  return (
    <Box maw={340} mx="auto">
      <form onSubmit={form.onSubmit((values) => handleSubmit({...user, ...values}))}>
        <TextInput
          withAsterisk
          label="Email"
          {...form.getInputProps('email')}
        />
        <TextInput
          withAsterisk
          label="Nickname"
          {...form.getInputProps('nickname')}
        />
        <TextInput
          withAsterisk
          label="Phone"
          {...form.getInputProps('phone')}
        />
        <TextInput
          withAsterisk
          label="City"
          placeholder="São Paulo"
          {...form.getInputProps('city')}
        />
        <Group justify="flex-end" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Box>
  );
}

export { EditForm }