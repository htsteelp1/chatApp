import {Router} from "express";
import {getServerList} from "../../controllers/userController";

const router = Router;

router.get("/servers", getServerList());

export default router;