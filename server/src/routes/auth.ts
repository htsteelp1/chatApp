import {type Request, type Response, Router} from 'express';
import passport from "passport";
import {registerUser} from "../controllers/userController.js";

const router = Router();

router.post('/login', passport.authenticate('local', {successRedirect: "/", failureRedirect: "/login"}));
router.post('/register', registerUser);
router.post("/logout", logOut)

function logOut(req: Request, res: Response) {
    req.logout(e => {
        if (e) return console.error(e);
        res.sendStatus(200);
    })
}


export default router;