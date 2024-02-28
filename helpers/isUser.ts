import { IUser } from "../database/users.types";

export function isUser(obj: any): obj is IUser {
    return (
        typeof obj.firstName === 'string' &&
        typeof obj.lastName === 'string' &&
        typeof obj.nickname === 'string' &&
        typeof obj.birthdate === 'string' &&
        typeof obj.bank === 'string' &&
        typeof obj.accountNumber === 'string' &&
        typeof obj.agencyNumber === 'string' &&
        typeof obj.city === 'string' &&
        typeof obj.document === 'string' &&
        typeof obj.phone === 'string' &&
        typeof obj.email === 'string' &&
        typeof obj.id === 'string'
    );
}

