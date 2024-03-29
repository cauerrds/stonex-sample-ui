import { IUser } from "../database/users.types"

const getUsers = () => {
    if (typeof window !== 'undefined' && window.localStorage) {
        const storagedDb = localStorage.getItem('ui-sample-stonex@db');
        if (storagedDb) {
            try {
                const storagedUsers: IUser[] = JSON.parse(storagedDb);
                return storagedUsers;
            } catch (error) {
                return
            }
        }
    }
    return
};

const storeUsersInLocalStorage = async (users: IUser[]) => {
    if (typeof window !== 'undefined' && window.localStorage) {
        try {
            const usersJson = JSON.stringify(users);
            localStorage.setItem('ui-sample-stonex@db', usersJson);
        } catch (error) {
            console.error('Erro ao armazenar usuários no localStorage:', error);
        }
    }
};

const deleteUser = async (users: IUser[], id: string) => {
    const user = users.find((user) => user.id === id)
    const userIdenx = users.findIndex((u) => u === user)
    if (userIdenx !== -1) {
        users.splice(userIdenx, 1);
        const baseUsers = JSON.stringify(users)
        localStorage.setItem('ui-sample-stonex@db', baseUsers)
        return users
    }
    return users
}

const editUser = async (users: IUser[], updatedUser: IUser) => {
    const userIndex = users.findIndex((user) => user.id === updatedUser.id);
    if (userIndex !== -1) {
        users[userIndex] = updatedUser;
        const updatedUsersJson = JSON.stringify(users);
        localStorage.setItem('ui-sample-stonex@db', updatedUsersJson);
        return users;
    } else {
        return users;
    }
};

const addUSer = async (users: IUser[], newUSer: IUser) => {
    users.push(newUSer)
    const updatedUsersJson = JSON.stringify(users);
    localStorage.setItem('ui-sample-stonex@db', updatedUsersJson);
    return users;
}

const userStoragedService = {
    addUSer,
    deleteUser,
    getUsers,
    storeUsersInLocalStorage,
    editUser
}

export { userStoragedService }