import https from "https";
import fs from "fs";
import "./db";
import app from "./app";
import dotenv from "dotenv";
dotenv.config();
import "./models/Comment";
import "./models/Place";
import "./models/User";

const PORT = process.env.PORT || 4000;

const handleListening = () =>
  console.log(`Listening on: https://localhost:${PORT}`);

https
  .createServer(
    {
      key: fs.readFileSync("server.key"),
      cert: fs.readFileSync("server.cert")
    },
    app
  )
  .listen(PORT, handleListening);

// app.listen(PORT, handleListening);
