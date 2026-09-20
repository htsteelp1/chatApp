import {messageHandler} from "./handlers/messageHandler";
import {roomHandler} from "./handlers/roomHandler";
import {onlyForHandshake} from "./middlewares/onlyForHandshake";
import {sessionMiddleware} from "../middlewares/sessionMiddleware";
import passport from "passport";

export default async (io) => {
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

    io.on("connection", async (socket) => {
        socket.on("room:join", roomHandler)
        socket.on("chat:message", messageHandler)
    })
}