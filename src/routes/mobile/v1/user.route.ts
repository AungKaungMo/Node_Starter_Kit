import { Router } from "express";
import {
  deleteController,
  getAllController,
  getDetailController,
  updateController,
} from "../../../controllers/mobile/v1/user.controller";

const userRoute = Router();

userRoute.get("/user", getAllController);
userRoute.get("/user/:id", getDetailController);
userRoute.put("/user/:id", updateController);
userRoute.delete("/user/:id", deleteController);

export default userRoute;
