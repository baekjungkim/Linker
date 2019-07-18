import express from "express";
import routes from "../routes";
import { home, postSmsRequest } from "../controllers/globalController";
import {
  getJoin,
  getLogin,
  postJoin,
  postLogin,
  logout
} from "../controllers/userController";
import { onlyPublic, onlyPrivate } from "../middlewares";

const globalRouter = express.Router();

globalRouter.get(routes.home, home);

globalRouter.get(routes.join, onlyPublic, getJoin);
globalRouter.post(routes.join, onlyPublic, postJoin, postLogin);

globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, onlyPublic, postLogin);

globalRouter.get(routes.logout, onlyPrivate, logout);

globalRouter.post(routes.smsRequest, postSmsRequest);

export default globalRouter;
