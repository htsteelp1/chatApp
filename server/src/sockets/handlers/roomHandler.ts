import type {Server, Socket} from "socket.io";
import {db} from "../../prisma/db";

export async function roomHandler(io: Server, socket: Socket) {
    const user = socket.request.user;
    socket.on("room:join", async (room) => {
    })
}