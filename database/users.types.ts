export interface IUser {
    firstName: string
    lastName: string
    nickname: string
    birthdate: string
    bank: string
    accountNumber: string
    agencyNumber: string
    city: string
    document: string
    phone: string
    email: string
    id: string
}


export interface IPatchRequestBody {
    nickname: string
    city: string
    phone: string
    email: string
}  