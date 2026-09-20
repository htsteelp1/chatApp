import bcrypt from "bcrypt";
import {db} from "../prisma/db";

export async function createUser(name: String, password: String) {
    const hash = await bcrypt.hash(password, 10);
    return await db.orm.public.User.create({name, hash});
}
export async function getMemberships(id: String) {
    const user = await db.orm.public.User.where({id}).include("servers").first();
    return user?.servers ?? [];
}