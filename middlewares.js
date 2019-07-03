import multer from "multer";
import routes from "./routes";

export const localMiddleware = (req, res, next) => {
  res.locals.siteName = "Linker";
  res.locals.routes = routes;
  res.locals.user = {
    isAuthenticated: true,
    id: 1
  };
  next();
};

const multerPlace = multer({ dest: "uploads/place/" });
export const placeUpload = multerPlace.array("placeFile");
