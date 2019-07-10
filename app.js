import express from "express";
import logger from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import { localMiddleware } from "./middlewares";
import routes from "./routes";
import globalRouter from "./routers/globalRouter";
import placeRouter from "./routers/placeRouter";

const app = express();

app.use(helmet());
app.set("view engine", "pug");
app.use("/static", express.static("static"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger("dev"));

app.use(localMiddleware);

app.use(routes.home, globalRouter);
app.use(routes.place, placeRouter);

app.use((req, res) => {
  res.status(400).send("일치하는 주소가 없습니다!");
});
app.use((err, req, res) => {
  console.error(err.stack);
  res.status(500).redirect(routes.home);
});

export default app;
