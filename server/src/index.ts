import "dotenv/config";
import express from 'express';
import session from "express-session";
import {passportConfig} from './config/passport';
import passport from "passport";
import {PrismaSessionStore} from "@quixo3/prisma-session-store";
import {createPrisma8SessionAdapter} from "./lib/prismaSessionAdapter";
import {db} from "./prisma/db";
import authRouter from "./routes/auth";

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

passportConfig();
app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRouter);


app.listen(port, () => { console.log(`Server running at http://localhost:${port}`); });