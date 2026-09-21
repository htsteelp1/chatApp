import {Router} from "express";
import {requireAuth} from "../middlewares/authRequired.js";
import meRouter from "./api/me.js"
import serverRouter from "./api/servers.js"

const router = Router();

router.use(requireAuth);

router.use("/me", meRouter);
router.use("/servers", serverRouter);

export default router;