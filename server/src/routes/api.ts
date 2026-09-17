import {Router} from "express";
import {requireAuth} from "../middlewares/authRequired";
import meRouter from "./api/me"
import serverRouter from "./api/servers"

const router = Router();

router.use(requireAuth);

router.use("/me", meRouter);
router.use("/servers", serverRouter);

export default router;