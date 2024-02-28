import { IUser } from "../database/users.types";


const getUsers = async () => {
    const url = `http://localhost:3000/api/users`
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        cache: 'no-cache'
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    return await response.json()
}

const deleteUser = async (currentUrl: string, id: string) => {
    const url = `${currentUrl}api/users/${id}`
    const response = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
}

const editUser = async (currentUrl: string, user: IUser) => {
    const url = `${currentUrl}/api/users/${user.id}`
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
}


const addUser = async (user: IUser) => {
    const url = `http://localhost:3000/api/users/`
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
}

const userLocalService = {
    deleteUser,
    editUser,
    getUsers,
    addUser
}

export {
    userLocalService
}