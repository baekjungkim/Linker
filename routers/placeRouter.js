import express from "express";
import routes from "../routes";
import {
  manage,
  placeDetail,
  getPlaceAdd,
  postPlaceAdd,
  placeFileUpload,
  postSearch,
  getSearch
} from "../controllers/placeController";
import { placeFile, onlyPrivate, onlyPublic } from "../middlewares";

const placeRouter = express.Router();

placeRouter.get(routes.manage, manage);

placeRouter.get(routes.search, getSearch);
placeRouter.post(routes.search, postSearch);

placeRouter.get(routes.placeAdd, onlyPrivate, getPlaceAdd);
placeRouter.post(routes.placeAdd, onlyPrivate, postPlaceAdd);

placeRouter.get(routes.placeDetail(), placeDetail);

placeRouter.post(routes.placeFileUpload, placeFile, placeFileUpload);

export default placeRouter;
