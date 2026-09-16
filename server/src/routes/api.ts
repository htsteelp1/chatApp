import {Router} from "express";
import {requireAuth} from "../middlewares/authRequired";
import meRouter from "./api/me"

const router = Router

router.use(requireAuth);

router.use("/me", meRouter);

export default router;