import { Router } from "express";
import {
  deleteController,
  getAllController,
} from "../../../controllers/mobile/v1/session.controller";

const sessionRoute = Router();

sessionRoute.get("/session", getAllController);
sessionRoute.delete("/session/:id", deleteController);

export default sessionRoute;
