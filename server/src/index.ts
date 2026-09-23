import "dotenv/config";
import {createServer} from "node:http";
import express from 'express';
import {passportConfig} from './config/passport.js';
import passport from "passport";
import authRouter from "./routes/auth.js";
import apiRouter from "./routes/api.js"
import {sessionMiddleware} from "./middlewares/sessionMiddleware.js";
import socketIo from "./sockets/sockets.js"
import {Server} from "socket.io";
import {join} from "path";
import {staticController} from "./controllers/staticController.js";
import {rateLimit} from "express-rate-limit";


const app = express();
const server = createServer(app);
const io = new Server(server, {
    maxHttpBufferSize: 1e4
});
const port = process.env.PORT || 3000;

const limiter = rateLimit({
    windowMs: 60 * 1000,
    max: 50,
});

app.use("/api", limiter)


app.use(sessionMiddleware);
app.use(express.json());               // for JSON bodies
app.use(express.urlencoded({ extended: true })); // for form-urlencoded bodies


app.use(passport.initialize());
app.use(passport.session());
passportConfig();

app.use("/auth", authRouter);
app.use("/api", apiRouter);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(join(import.meta.dirname, "../../client/dist")));
    app.get("/{*splat}", staticController);
}

socketIo(io);



server.listen(port, () => { console.log(`Server running at http://localhost:${port}`); });