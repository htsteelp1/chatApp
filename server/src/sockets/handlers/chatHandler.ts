import type {Server, Socket} from "socket.io";
import {db} from "../../prisma/db";


export async function registerChatHandler(io: Server, socket: Socket) {
    const user = socket.request.user;

    async function onMessage({message, roomId}) {
    }

    async function onJoin(roomId: String) {

    }
    socket.on("chat:join", onJoin);
    socket.on("chat:message", onMessage);
}
