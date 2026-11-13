import {onlyForHandshake} from "./middlewares/onlyForHandshake.js";
import {sessionMiddleware} from "../middlewares/sessionMiddleware.js";
import {registerChatHandler} from "./handlers/chatHandler.js"
import passport from "passport";
import type {Server, Socket} from "socket.io";


export default async (io: Server) => {
    io.engine.use(onlyForHandshake(sessionMiddleware));
    io.engine.use(onlyForHandshake(passport.session()));
    io.engine.use(
        onlyForHandshake((req, res, next) => {
            if (req.user) {
                next();
            } else {
                res.writeHead(401);
                res.end();
            }
        }),
    );

    io.on("connection", async (socket: Socket) => {
        registerChatHandler(io, socket);
    })
}