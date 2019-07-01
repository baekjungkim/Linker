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
