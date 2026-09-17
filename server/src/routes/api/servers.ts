import {Router} from "express";
import {getServer} from "../../controllers/serverController";

const router = Router();

router.get("/:serverId", getServer);

export default router;