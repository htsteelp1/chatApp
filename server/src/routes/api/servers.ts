import {Router} from "express";
import {addMember, getServer} from "../../controllers/serverController.js";

const router = Router();

router.post("/:serverId/members", addMember)
router.get("/:serverId", getServer);

export default router;