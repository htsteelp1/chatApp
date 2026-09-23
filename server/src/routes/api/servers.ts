import {Router} from "express";
import {addMember, createServer, deleteMemberFromServer, getServer} from "../../controllers/serverController.js";

const router = Router();

router.delete("/:serverId/members/", deleteMemberFromServer)
router.post("/:serverId/members", addMember);
router.get("/:serverId", getServer);
router.post("/", createServer);

export default router;