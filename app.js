import express from "express";
import logger from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import passport from "passport";
import session from "express-session";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";
import favicon from "serve-favicon";
import path from "path";
import { localMiddleware } from "./middlewares";
import routes from "./routes";
import globalRouter from "./routers/globalRouter";
import placeRouter from "./routers/placeRouter";

import "./passport";
import userRouter from "./routers/userRouter";

const app = express();

const CookieStore = MongoStore(session);

app.use(helmet());
app.set("view engine", "pug");
app.use("/static", express.static("static"));
app.use(favicon(path.join(__dirname, "static/images", "favicon.ico")));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger("dev"));
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: false,
    store: new CookieStore({ mongooseConnection: mongoose.connection })
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(localMiddleware);

app.use(routes.home, globalRouter);
app.use(routes.place, placeRouter);
app.use(routes.user, userRouter);

app.use((req, res) => {
  res.status(400).send("일치하는 주소가 없습니다!");
});
app.use((err, req, res) => {
  console.error(err.stack);
  res.status(500).redirect(routes.home);
});

export default app;
