import { IUser } from "../database/users.types";

export function sortNumbersByValue(users: IUser[], ascending = true) {
    return users.slice().sort((a, b) => {
        const numA = parseFloat(a.bank + "");
        const numB = parseFloat(b.bank + "");

        if (numA < numB) {
            return ascending ? -1 : 1;
        }
        if (numA > numB) {
            return ascending ? 1 : -1;
        }
        return 0;
    });
}