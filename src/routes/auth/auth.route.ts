import { Router } from "express";
import {
  loginController,
  logoutController,
  registerController,
  refreshController,
  changePasswordController,
} from "../../controllers/auth/auth.controller";
import authenticate from "../../middlewares/authenticate";

const authRoute = Router();

authRoute.post("/auth/register", registerController);
authRoute.post("/auth/login", loginController);
authRoute.get("/auth/logout", logoutController);
authRoute.get("/auth/refresh", refreshController);
authRoute.post("/auth/change-password", authenticate, changePasswordController);

export default authRoute;
