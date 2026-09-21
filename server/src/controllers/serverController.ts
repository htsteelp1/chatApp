import type {Request, Response} from "express";
import * as serverService from "../services/serverService"
import * as messageService from "../services/messageService";

export async function getServer(req: Request, res: Response) {
    try {
        const server = await serverService.getServerForUser(req.params.serverId, req.user.id)
        if (!server) {
            res.sendStatus(404);
            return
        }
        server.messages = await messageService.getMessages(server.id);
        return res.json(server);

    } catch (e) {
        console.error(e);
    }
}