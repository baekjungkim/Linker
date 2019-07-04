import express from "express";
import routes from "../routes";
import {
  manage,
  placeDetail,
  getPlaceAdd,
  postPlaceAdd,
  placeFileUpload
} from "../controllers/placeController";
import { placeFile } from "../middlewares";

const placeRouter = express.Router();

placeRouter.get(routes.manage, manage);

placeRouter.get(routes.placeAdd, getPlaceAdd);
placeRouter.post(routes.placeAdd, postPlaceAdd);

placeRouter.get(routes.placeDetail(), placeDetail);

placeRouter.post(routes.placeFileUpload, placeFile, placeFileUpload);

export default placeRouter;
