import type {Server, Socket} from "socket.io";
import {getServerForUser} from "../../services/serverService";


export async function registerChatHandler(io: Server, socket: Socket) {
    const user = socket.request.user;
    async function onJoin(serverId: String) {
        socket.leave(socket.data.roomId)
        const server = await getServerForUser(serverId, user.id);
        if (!server) {
            socket.data.roomId = "0";
            return;
        }
        console.log(`Joined ${serverId}`);
        return socket.join(server.id);
    }

    async function onMessage(message) {
    }



    socket.on("chat:join", onJoin);
    socket.on("chat:message", onMessage);
}
