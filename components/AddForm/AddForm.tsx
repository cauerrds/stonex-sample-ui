'use client'
import { TextInput, Button, Group, Box } from '@mantine/core';
import { useForm } from '@mantine/form';
import { Dispatch, SetStateAction } from 'react';
import { IUser } from '../../database/users.types';

import { isValid } from 'date-fns';
import { DateInput } from '@mantine/dates';
import { nanoid } from '@reduxjs/toolkit';
import { userLocalService } from '../../service/users.local.service';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store/store';
import { getAllUsers } from '../../redux/features/usertsActions';
import { userStoragedService } from '../../service/users.storaged.service';
import { filterOptions } from '../HomeScreen/HomeScree';

export interface AddFormProps {
  filterData:  (filterType?: filterOptions, data?: IUser[]) => void
  users: IUser[]
  AddDrawerClose: () => void
  currentFilter: filterOptions

}
const AddForm = ({filterData, users, AddDrawerClose, currentFilter}:AddFormProps) => {
const dispatch = useDispatch<AppDispatch>();

const form = useForm({
  initialValues: {
    firstName: "",
    lastName: "",
    nickname: "",
    birthdate: "",
    bank: "",
    agencyNumber: "",
    accountNumber: "",
    city: "",
    document: "",
    phone: "",
    email: "",
  },

  validate: {
    firstName: (value) => value.length < 3 ? 'First Name must have at least 2 letters' : null,
    lastName: (value) => value.length < 3 ? 'Last Name must have at least 2 letters' : null,
    nickname: (value) => value.length < 3 ? 'Nickname must have at least 2 letters' : null,
    birthdate: (value) => {
      return isValid(new Date(value)) ? null : 'Invalid date';
    },
    bank: (value) => value.length < 1 ? 'Bank must have at least 1 character' : null,
    agencyNumber: (value) => value.length < 1 ? 'Agency number is required' : null,
    accountNumber: (value) => value.length < 1 ? 'Account number is required' : null,
    city: (value) => value.length < 1 ? 'City must have at least 1 letter' : null,
    document: (value) => value.length < 1 ? 'Document is required' : null,
    phone: (value) => /^(\(\d{2}\)\s?)?\d{5}-\d{4}$|^0?\d{11}$|^11\d{10}$/.test(value) ? null : 'Invalid phone number',
    email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email')
  }
});

  const handleSubmit = async (newUser: IUser) => {
    const currentUrl = window.location.href
    if(currentUrl.includes('localhost')){
      await userLocalService.addUser(newUser)
      const res = await dispatch(getAllUsers())
    } else {
      const newUserList = await userStoragedService.addUSer(users, newUser)
      filterData(currentFilter, newUserList)
    }  
    AddDrawerClose()
  }

  return (
    <Box maw={340} mx="auto">
      <form onSubmit={form.onSubmit((values) => {handleSubmit({...values, id: nanoid(6)});})}>
        <TextInput
            withAsterisk
            label="First Name"
            {...form.getInputProps('firstName')}
        />
        <TextInput
            withAsterisk
            label="Last Name"
            {...form.getInputProps('lastName')}
        />
        <TextInput
            withAsterisk
            label="Nickname"
            {...form.getInputProps('nickname')}
        />
        <DateInput 
            clearable 
            label="Date" 
            placeholder="Date " 
            {...form.getInputProps('birthdate')}
        />
        <TextInput
            withAsterisk
            label="Bank"
            {...form.getInputProps('bank')}
        />
        <TextInput
            withAsterisk
            label="Account Number"
            {...form.getInputProps('accountNumber')}
        />
        <TextInput
            withAsterisk
            label="Agency Number"
            {...form.getInputProps('agencyNumber')}
        />
        <TextInput
            withAsterisk
            label="Document"
            {...form.getInputProps('document')}
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
        <TextInput
            withAsterisk
            label="email"
            placeholder="john@example.com"
            {...form.getInputProps('email')}
        />
        <Group justify="flex-end" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Box>
  );
}

export { AddForm }