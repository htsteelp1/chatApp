import type {Request, Response} from "express";
import {join} from "path";

export function staticController(req: Request, res: Response) {
    res.sendFile(join(import.meta.dirname, "../../../client/dist", "index.html"));
}