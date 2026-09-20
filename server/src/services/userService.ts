import bcrypt from "bcrypt";
import {db} from "../prisma/db";

export async function createUser(name: String, password: String) {
    const hash = await bcrypt.hash(req.body.password, 10);
    return await db.orm.public.User.create({name: req.body.username, hash: hash});
}
export async function getMemberships(id: String) {
    const user = await db.orm.public.User.where({id: req.user.id}).include("servers").first();
    return user?.servers ?? [];
}