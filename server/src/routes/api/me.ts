import {Router} from "express";
import {getServerList, returnUser} from "../../controllers/userController";

const router = Router();

router.get("/servers", getServerList);

router.get("/", returnUser);

export default router;