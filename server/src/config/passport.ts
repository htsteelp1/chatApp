import passport from 'passport';
import {Strategy} from 'passport-local';
import {db} from "../prisma/db";
import bcrypt from "bcrypt";

export function passportConfig()
{
    // Local Strategy
    passport.use(new Strategy(async (username, password, done) => {
        try {
            if (!username || !password) {
                return done(null, false);
            }
            const user = await db.orm.public.User.where({ username }).all();
            if (!user) {
                return done(null, false);
            }
            const isMatch = await bcrypt.compare(password, user.password);
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
        done(null, user.id);
    })
    passport.deserializeUser(async (id, done) => {
        try {
        const user = await db.orm.public.User.where({ id }).all();
        if (!user) {
            return done(null, false);
        }
        return done(null, user); }
        catch(err){
            console.error(err);
        }
    })
}