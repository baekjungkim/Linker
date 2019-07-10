import multer from "multer";
import routes from "./routes";
import utils from "./utils";
import dotenv from "dotenv";
dotenv.config();

export const localMiddleware = (req, res, next) => {
  res.locals.siteName = "Linker";
  res.locals.routes = routes;
  res.locals.user = {
    isAuthenticated: true,
    id: 1
  };
  res.locals.env = process.env;
  next();
};

const multerPlace = multer({
  dest: "uploads/" + utils.dateYYYYMMDD() + "/place/"
});
export const placeFile = multerPlace.array("placeFile[]");
