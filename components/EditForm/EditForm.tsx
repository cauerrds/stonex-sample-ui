'use client'
import { TextInput, Button, Group, Box } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IPatchRequestBody, IUser } from '../../database/users.types';


const EditForm = (user: IUser) => {
  let currentUrl = window.location.href

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

  const handleSubmit = async (user: IUser) => {
    const url = `${currentUrl}/api/users/${user.id}`
    try {
      const response = await fetch(url, {
      method: 'PATCH', 
      headers: {
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify(user), 
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json(); 
    console.log(data); 
  } catch (error) {
    console.error('There was a problem with your fetch operation:', error);
  }
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