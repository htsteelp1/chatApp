import bcrypt from "bcrypt";
import {db} from "../db/index.js";
import {users} from "../db/schema.js";

export async function createUser(name: string, password: string) {
    const hash = await bcrypt.hash(password, 10);
    const [user] = await db.insert(users).values({
        name,
        hash,
    }).returning();
    return user!;
}
export async function getServers(id: number) {
    const user = await db.query.users.findFirst({
        where: {id},
        with: {
            servers: true
        }
    });
    return user?.servers;
}
export async function getUserByName(name: string) {
    return await db.query.users.findFirst({where: {name: name}})
}
export async function getUserById(id: number) {
    return await db.query.users.findFirst({where: {id}});
}