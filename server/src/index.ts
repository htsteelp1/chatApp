import "dotenv/config";
import express from 'express';
import session from "express-session";
import {passportConfig} from './config/passport.js';
import passport from "passport";
import {PrismaSessionStore} from "@quixo3/prisma-session-store";
import {createPrisma8SessionAdapter} from "./lib/prismaSessionAdapter";
import {db} from "./prisma/db";
import authRouter from "./routes/auth.js";
import apiRouter from "./routes/api.js"

const prismaAdapter = createPrisma8SessionAdapter(db, db.orm.public.Session, {
    modelName: "session"
});

const app = express();
const port = process.env.PORT || 3000;


app.use(session({
    cookie: { maxAge: 7 * 24 * 60 * 60 * 1000 },
    secret: process.env.SESSION_SECRET || crypto.randomUUID(),
    resave: false,
    saveUninitialized: false,
    store: new PrismaSessionStore(prismaAdapter as any, {
        checkPeriod: 2*60*1000,
        dbRecordIdIsSessionId: true,
        // dbRecordIdFunction: undefined,
    })
}));
app.use(express.json());               // for JSON bodies
app.use(express.urlencoded({ extended: true })); // for form-urlencoded bodies


app.use(passport.initialize());
app.use(passport.session());
passportConfig();

app.use("/auth", authRouter);
app.use("/api", apiRouter);




app.listen(port, () => { console.log(`Server running at http://localhost:${port}`); });