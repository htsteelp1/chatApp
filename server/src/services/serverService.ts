import {db} from "../prisma/db.js";

export async function getServerForUser(serverID: String, userID: String) {
    const membership = await db.orm.public.ServerMembers
        .where({serverId: serverID, userId: userID})
        .include("server")
        .first();
    return membership.server;
}
export async function addMemberToServer(serverId: String, userId: String) {
    return await db.orm.public.ServerMembers.create({serverId, userId});

}