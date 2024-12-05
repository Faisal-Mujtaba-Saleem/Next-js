import fs from 'fs/promises';
import { NextResponse } from 'next/server';

export async function POST(request) {
    let contact = await request.json()
    contact = { ...contact, date: new Date().toISOString() }

    try {
        fs.access('./contact.json', fs.constants.R_OK);

        const data = await fs.readFile('./contact.json', 'utf-8');

        let contacts = JSON.parse(data);
        contacts = Array.isArray(contacts) ? [...contacts, contact] : [contact];
        console.log(contacts);

        await fs.writeFile('./contact.json', JSON.stringify(contacts, null, 2));
    } catch (error) {
        await fs.writeFile('./contact.json', JSON.stringify([contact], null, 2))
    }

    return NextResponse.json({
        success: true,
        message: 'Contact added successfully',
    })
}