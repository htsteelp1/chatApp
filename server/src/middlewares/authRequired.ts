import type {NextFunction, Request, Response} from "express";

export async function requireAuth(req: Request, res: Response, next: NextFunction) {
    try {
        if (!req.isAuthenticated()) {
            return res.sendStatus(401);
        }
        return next();
    }
    catch (e) {
        console.error(e);
    }
}