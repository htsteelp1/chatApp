import {socket} from "@/socket.ts";
export async function sendMessage(reqMessage) {
    socket.emit("chat:message", reqMessage);
    console.log(reqMessage);
}