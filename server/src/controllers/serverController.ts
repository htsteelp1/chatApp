import type {Request, Response} from "express";
import * as serverService from "../services/serverService.js"
import * as messageService from "../services/messageService.js";
import * as userService from "../services/userService.js"

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

export async function addMember(req: Request, res: Response) {
    try {
        const allowed = await serverService.getServerForUser(req.params.serverId, req.user.id)
        if (!allowed) {
            return res.redirect("/")
        }
        const addUser = await userService.getUserByName(req.body.name);
        const membership = await serverService.addMemberToServer(req.params.serverId, addUser.id)
        if (!membership) {
            return res.redirect("/");
        }
        res.redirect(`/chat/${req.params.serverId}`)
    }
    catch (e) {
        console.error(e);
        res.redirect("/")
    }
}

export async function createServer(req: Request, res: Response) {
    try {
        const server = await serverService.createServer(req.body.name, req.user.id);
        if (!server) {
            return res.redirect("/")
        }
        return res.redirect(`/chat/${server.id}`);
    }
    catch (e) {
        console.error(e);
        res.redirect("/")
    }
}
export async function deleteMemberFromServer(req: Request, res: Response) {
    try {
        await serverService.removeMemberFromServer(req.params.serverId, req.user.id);
        return res.sendStatus(200);
    }
    catch (e) {
        console.error(e);
    }
}