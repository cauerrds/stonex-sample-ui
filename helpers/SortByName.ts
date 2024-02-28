import { IUser } from "../database/users.types";

export function sortUsersByName(users: IUser[], ascending = true) {
    return users.slice().sort((a, b) => {
        const nameA = a.firstName.toUpperCase();
        const nameB = b.firstName.toUpperCase();

        if (nameA < nameB) {
            return ascending ? -1 : 1;
        }
        if (nameA > nameB) {
            return ascending ? 1 : -1;
        }
        return 0;
    });
}