import type {Request, Response} from "express";
import * as serverService from "../services/serverService"

export async function getServer(req: Request, res: Response) {
    try {
        const server = serverService.getServerForUser(req.params.serverID, req.user.id)
        if (!server) {
            res.sendStatus(404);
            return
        }
        return res.json(server);

    } catch (e) {
        console.error(e);
    }
}