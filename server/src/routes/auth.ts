import {Router} from 'express';
import passport from "passport";
import {registerUser} from "../controllers/userController";

const authRouter = Router();

authRouter.post('/auth/login', passport.authenticate('local', {successRedirect: "/", failureRedirect: "/login"}));
authRouter.post('/auth/register', registerUser);

export default authRouter;