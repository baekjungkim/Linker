import multer from "multer";
import routes from "./routes";
import { dateYYYYMMDD } from "./utils";
import dotenv from "dotenv";
dotenv.config();

export const localMiddleware = (req, res, next) => {
  res.locals.siteName = "Linker";
  res.locals.routes = routes;
  res.locals.user = req.user || null;
  res.locals.env = process.env;
  next();
};

const multerPlace = multer({
  dest: "uploads/" + dateYYYYMMDD() + "/place/"
});
export const placeFile = multerPlace.array("placeFile[]");

export const onlyPublic = (req, res, next) => {
  if (req.user) {
    res.redirect(routes.home);
  } else {
    next();
  }
};

export const onlyPrivate = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect(routes.home);
  }
};
