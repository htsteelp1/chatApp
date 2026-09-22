import type {Server, Socket} from "socket.io";
import {getServerForUser} from "../../services/serverService.js";
import {createMessage} from "../../services/messageService.js";
import {RateLimiterMemory} from "rate-limiter-flexible";

const messageLimiter = new RateLimiterMemory({
    points: 3,
    duration: 2
})

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
        socket.data.roomId = server.id;
        return socket.join(server.id);
    }

    async function onMessage(reqMessage) {
        try {
            await messageLimiter.consume(socket.id);
        }
        catch (e) {
            return;
        }
        const message = await createMessage(reqMessage, user.id, socket.data.roomId);
        io.to(socket.data.roomId).emit("message", message);
        console.log(message);
    }



    socket.on("chat:join", onJoin);
    socket.on("chat:message", onMessage);
}
