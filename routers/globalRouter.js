import express from "express";
import routes from "../routes";
import { home, manage } from "../controllers/globalController";

const globalRouter = express.Router();

globalRouter.get(routes.home, home);
globalRouter.get(routes.manage, manage);

export default globalRouter;
