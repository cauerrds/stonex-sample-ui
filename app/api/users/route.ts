import { promises as fs } from 'fs';
import { NextResponse } from 'next/server';
import { IUser } from '../../../database/users.types';
import { isUser } from '../../../helpers/isUser';
import { nanoid } from '@reduxjs/toolkit';


export async function GET(req: Request) {
    if (req.method !== 'GET') {
        return NextResponse.json({ error: 'method not allowed' }, { status: 405 })
    }
    try {
        const data = await fs.readFile(process.cwd() + '/database/users.json', 'utf-8')
        const users: IUser[] = JSON.parse(data)
        return NextResponse.json({ success: true, data: users }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 })
    }
}

export async function POST(req: Request) {
    if (req.method !== 'POST') {
        return NextResponse.json({ error: 'method not allowed' }, { status: 405 })
    }
    const data = await fs.readFile(process.cwd() + '/database/users.json', 'utf-8')
    const users: IUser[] = await JSON.parse(data)
    let body = await req.json()
    body.id = nanoid(6)

    if (isUser(body)) {
        users.unshift(body)
        const usersJSON = JSON.stringify(users)
        await fs.writeFile(process.cwd() + '/database/users.json', usersJSON)
        return NextResponse.json({ success: true, message: `User ${body.firstName} created` }, { status: 201 })
    }

    return NextResponse.json({ success: false, message: 'Bad Request' }, { status: 400 })
}
