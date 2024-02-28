import { promises as fs } from 'fs';
import { NextResponse } from 'next/server';
import { use } from 'react';
import { IPatchRequestBody, IUser } from '../../../../database/users.types';


export async function GET(req: Request, route: { params: { id: string } }) {
    if (req.method !== 'GET') {
        return NextResponse.json({ success: false, message: 'method not allowed' }, { status: 405 })
    }
    const data = await fs.readFile(process.cwd() + '/database/users.json', 'utf-8')
    const users: IUser[] = await JSON.parse(data)
    const id = route.params.id

    const user = users.find((user) => user.id === id)

    return NextResponse.json(user)
}


export async function PATCH(req: Request, route: { params: { id: string } }) {
    if (req.method !== 'PATCH') {
        return NextResponse.json({ success: false, message: 'method not allowed' }, { status: 405 })
    }
    const id = route.params.id
    if (!id) {
        return NextResponse.json({ success: false, message: 'id not found' }, { status: 400 })
    }

    const data = await fs.readFile(process.cwd() + '/database/users.json', 'utf-8')
    const users: IUser[] = await JSON.parse(data)
    const user = users.find((user) => user.id === id)
    if (!user) {
        return NextResponse.json({ success: false, message: 'user not found' }, { status: 400 })
    }
    const body: IPatchRequestBody = await req.json()

    const userNewData: IUser = {
        ...user,
        phone: body.phone || user.phone,
        email: body.email || user.email,
        city: body.city || user.city,
        nickname: body.nickname || user.nickname,
    }
    const userIdenx = users.findIndex((u) => u === user)
    users[userIdenx] = userNewData
    const usersJSON = JSON.stringify(users)

    try {
        await fs.writeFile(process.cwd() + '/database/users.json', usersJSON)
        return NextResponse.json({ success: true, message: `User edited` }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 })
    }
}


export async function DELETE(req: Request, route: { params: { id: string } }) {
    if (req.method !== 'DELETE') {
        return NextResponse.json({ success: false, message: 'method not allowed' }, { status: 405 })
    }
    const id = route.params.id
    if (!id) {
        return NextResponse.json({ success: false, message: 'user not found' }, { status: 400 })
    }

    const data = await fs.readFile(process.cwd() + '/database/users.json', 'utf-8')
    const users: IUser[] = await JSON.parse(data)
    const user = users.find((user) => user.id === id)
    if (!user) {
        return NextResponse.json({ success: false, message: 'user not found' }, { status: 400 })
    }

    const userIdenx = users.findIndex((u) => u === user)
    users.splice(userIdenx, 1);
    const usersJSON = JSON.stringify(users)

    try {
        await fs.writeFile(process.cwd() + '/database/users.json', usersJSON)
        return NextResponse.json({ success: true, message: `User edited` }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 })
    }

}