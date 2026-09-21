import passport from 'passport';
import {Strategy} from 'passport-local';
import {db} from "../prisma/db.js";
import bcrypt from "bcrypt";

export function passportConfig()
{
    // Local Strategy
    passport.use(new Strategy(async (username, password, done) => {
        try {
            if (!username || !password) {
                return done(null, false);
            }
            const user = await db.orm.public.User.where({ name: username }).first();
            if (!user) {
                return done(null, false);
            }
            // @ts-ignore
            const isMatch = await bcrypt.compare(password, user.hash);
            if (!isMatch) {
                return done(null, false);
            }
            return done(null, user);
        }
        catch(err){
            console.error(err);
        }
    }))
    passport.serializeUser((user, done) => {
        // @ts-ignore
        done(null, user.id);
    })
    passport.deserializeUser(async (id, done) => {
        try {
        // @ts-ignore
            const user = await db.orm.public.User.where({ id }).first();
        if (!user) {
            return done(null, false);
        }
        return done(null, user); }
        catch(err){
            console.error(err);
        }
    })
}