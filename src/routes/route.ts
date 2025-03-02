import { Router } from "express";
import authRoute from "./auth/auth.route";
import sessionRoute from "./mobile/v1/session.route";
import userRoute from "./mobile/v1/user.route";
import mediaRoute from "./common/media.route";
import authenticate from "../middlewares/authenticate";

const router = Router();

const authenticateV1Routes = [sessionRoute, userRoute, mediaRoute];

router.use("/v1", authRoute);

authenticateV1Routes.forEach((route) => router.use("/v1", authenticate, route));

export default router;
