import {db} from "../prisma/db";
import type {NextFunction, Request, Response} from "express";
import bcrypt from "bcrypt";

async function registerUser(req: Request, res: Response) {
    try {
        if (!req.body.username || !req.body.password) {
            res.status(400).send({});
            return;
        }
        const hash = await bcrypt.hash(req.body.password, 10);
        const user = await db.orm.public.User.create({username: req.body.username, hash: hash});
        req.login(user, function(err) {
            console.log(err);
        });
        return res.status(200).send({});

    }
    catch(err) {
        console.error(err);
    }
}
export {registerUser};