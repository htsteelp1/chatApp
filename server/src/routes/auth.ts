import {Router} from 'express';
import passport from "passport";
import {registerUser} from "../controllers/userController";

const router = Router();

router.post('/login', passport.authenticate('local', {successRedirect: "/", failureRedirect: "/login"}));
router.post('/register', registerUser);

export default router;