import type {Request, Response} from "express";
import * as userService from "../services/userService"

export async function registerUser(req: Request, res: Response) {
    try {
        if (!req.body.username || !req.body.password) {
            res.status(400).send({});
            return;
        }
        const user = await userService.createUser(req.body.username, req.body.password)
        req.login(user, function(err) {
            console.log(err);
            return res.redirect("/");
        });

    }
    catch(err) {
        console.error(err);
    }
}

export async function getServerList(req: Request, res: Response) {
    try {
        const servers = await userService.getMemberships(req.user.id);
        if (!servers) {
            res.sendStatus(404);
        }
        res.json(servers);
    }
    catch (e) {
        console.error(e)
    }
}
export async function returnUser(req: Request, res: Response) {
    res.json(req.user)
}