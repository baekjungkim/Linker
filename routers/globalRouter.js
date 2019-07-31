import express from "express";
import passport from "passport";
import routes from "../routes";
import { home, postSmsRequest } from "../controllers/globalController";
import {
  getJoin,
  getLogin,
  postJoin,
  postLogin,
  logout,
  facebookLogin,
  kakaoLogin,
  naverLogin,
  googleLogin,
  postSocialLogin
} from "../controllers/userController";
import { onlyPublic, onlyPrivate } from "../middlewares";

const globalRouter = express.Router();

globalRouter.get(routes.home, home);

globalRouter.get(routes.join, onlyPublic, getJoin);
globalRouter.post(routes.join, onlyPublic, postJoin, postLogin);

globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, onlyPublic, postLogin);

globalRouter.get(routes.facebook, facebookLogin);
globalRouter.get(
  routes.facebookCallBack,
  passport.authenticate("facebook", { failureRedirect: routes.login }),
  postSocialLogin
);

globalRouter.get(routes.kakao, kakaoLogin);
globalRouter.get(
  routes.kakaoCallback,
  passport.authenticate("kakao", { failureRedirect: routes.login }),
  postSocialLogin
);

globalRouter.get(routes.naver, naverLogin);
globalRouter.get(
  routes.naverCallback,
  passport.authenticate("naver", { failureRedirect: routes.login }),
  postSocialLogin
);

globalRouter.get(routes.google, googleLogin);
globalRouter.get(
  routes.googleCallback,
  passport.authenticate("google", { failureRedirect: routes.login }),
  postSocialLogin
);

globalRouter.get(routes.logout, onlyPrivate, logout);

globalRouter.post(routes.smsRequest, postSmsRequest);

export default globalRouter;
