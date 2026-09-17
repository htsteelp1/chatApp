import type {Request, Response} from "express";
import {db} from "../prisma/db";

export async function getServer(req: Request, res: Response) {
    try {
        const server = await db.orm.public.Server.where(
            {id: req.params.serverId}).where(
            (s) =>
                s.members.some((u) =>
                    u.id.eq(req.user.id)
                )
        ).include("messages", (m) =>
            m.include("author").limit(50).orderBy((n) =>
                n.createdAt.desc()
            )
        ).first();
        if (!server) {
            res.sendStatus(404);
            return
        }
        return res.json(server);

    } catch (e) {
        console.error(e);
    }
}