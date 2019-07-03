import express from "express";
import routes from "../routes";
import {
  manage,
  placeDetail,
  getPlaceAdd,
  postPlaceAdd
} from "../controllers/placeController";
import { placeUpload } from "../middlewares";

const placeRouter = express.Router();

placeRouter.get(routes.manage, manage);

placeRouter.get(routes.placeAdd, getPlaceAdd);
placeRouter.post(routes.placeAdd, placeUpload, postPlaceAdd);

placeRouter.get(routes.placeDetail(), placeDetail);

export default placeRouter;
