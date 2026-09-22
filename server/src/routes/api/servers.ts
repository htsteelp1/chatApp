import {Router} from "express";
import {addMember, createServer, getServer} from "../../controllers/serverController.js";

const router = Router();


router.post("/:serverId/members", addMember);
router.get("/:serverId", getServer);
router.post("/", createServer);

export default router;