import multer from "multer";
import routes from "./routes";
import utils from "./utils";

export const localMiddleware = (req, res, next) => {
  res.locals.siteName = "Linker";
  res.locals.routes = routes;
  res.locals.user = {
    isAuthenticated: true,
    id: 1
  };
  next();
};

const multerPlace = multer({
  dest: "uploads/" + utils.dateYYYYMMDD() + "/place/"
});
export const placeFile = multerPlace.array("placeFile[]");
