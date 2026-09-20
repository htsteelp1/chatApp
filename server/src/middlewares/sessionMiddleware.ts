import "dotenv/config";
import session from "express-session";
import {PrismaSessionStore} from "@quixo3/prisma-session-store";
import {createPrisma8SessionAdapter} from "../lib/prismaSessionAdapter";
import {db} from "../prisma/db";

const prismaAdapter = createPrisma8SessionAdapter(db, db.orm.public.Session, {
    modelName: "session"
});

export const sessionMiddleware = session({
    cookie: {maxAge: 7 * 24 * 60 * 60 * 1000},
    secret: process.env.SESSION_SECRET || crypto.randomUUID(),
    resave: false,
    saveUninitialized: false,
    store: new PrismaSessionStore(prismaAdapter as any, {
        checkPeriod: 2 * 60 * 1000,
        dbRecordIdIsSessionId: true,
        // dbRecordIdFunction: undefined,
    })
})