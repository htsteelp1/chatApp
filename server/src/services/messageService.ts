import {db} from "../prisma/db";

export async function getMessages(serverId: string) {
    const server = await db.orm.public.Server
        .where({id: serverId})
        .include("messages", (message1) =>
             message1.orderBy((message2) =>
                 message2.createdAt.desc()
              ).limit(50)
                 .include("author")
        )
        .first();
    return server.messages;
}