import {db} from "../db/index.js";
import {memberships, servers} from "../db/schema.js";
import {and, eq} from "drizzle-orm";

export async function getServerForUser(serverId: number, userId: number) {
    const membership = await db.query.memberships.findFirst({
        where: {
            userId,
            serverId,
        },
        with: {
            server: true
        }
    })
    return membership?.server;
}

export async function createServer(name: string, userId: number) {
    return db.transaction(tx => {
        const s = tx.insert(servers).values({name, ownerId: userId}).returning().get();
        tx.insert(memberships).values({userId, serverId: s!.id});
        return s;
    });
}

export async function removeMemberFromServer(serverId: number, userId: number) {
    await db.delete(memberships).where(and(eq(memberships.userId, userId), eq(memberships.serverId, serverId)));
}

export async function addMemberToServer(serverId: number, userId: number) {
    const server = await db.query.servers.findFirst({
        where: {
            members: {
                id: userId
            },
            id: serverId
        }
    })

}
