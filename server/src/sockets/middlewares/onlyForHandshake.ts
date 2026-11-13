import type {NextFunction, Request, Response} from "express";

export function onlyForHandshake(middleware: any) {
    return (req: Request, res:Response, next: NextFunction) => {
        // @ts-expect-error
        const isHandshake = req._query.sid === undefined;
        if (isHandshake) {
            middleware(req, res, next);
        } else {
            next();
        }
    };
}