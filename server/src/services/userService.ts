import bcrypt from "bcrypt";
import {db} from "../db/index.js";
import {users} from "../db/schema.js";

export async function createUser(name: string, password: string) {
    const hash = await bcrypt.hash(password, 10);
    return await db.insert(users).values({
        name,
        hash,
    });
}
// export async function getMembershipsByUserId(id: String) {
//     const user = await db.query.users.findFirst();
//     return user?.servers ?? [];
// } move this to serverMembershipsService.ts
export async function getUserByName(name: string) {
    return await db.query.users.findFirst({where: {name: name}})
}