"use server";
import fs from 'fs/promises';

export async function submitUserAction(user) {
    user.signedInAt = new Date().toISOString();
    try {
        await fs.access('./user.json', fs.constants.R_OK);

        let users = await fs.readFile('./user.json', 'utf-8');
        users = Array.isArray(users) ? [...users, user] : [user];
        users = users.filter(user_ => user_.email !== user.email);

        await fs.writeFile('./user.json', JSON.stringify(users, null, 2));
    } catch (error) {
        console.log(error.message);
        await fs.writeFile('./user.json', JSON.stringify([user], null, 2));
    }
}