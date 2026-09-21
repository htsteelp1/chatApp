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
export async function createMessage(content: string, authorId: string, serverId: string ) {
    const created = await db.orm.public.Message.create({content, authorId, serverId});
    const message = await db.orm.public.Message.where({id: created.id}).include("author").first();
    if (!message) {
        console.log("Unable to create message");
        return;
    }
    return message;
}