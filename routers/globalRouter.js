import express from "express";
import routes from "../routes";
import { home, jusoPopup } from "../controllers/globalController";

const globalRouter = express.Router();

globalRouter.get(routes.home, home);
globalRouter.get(routes.jusoPopup, jusoPopup);
globalRouter.post(routes.jusoPopup, jusoPopup);

export default globalRouter;
