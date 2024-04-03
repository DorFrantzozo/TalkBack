import express from "express";
import serverSocket from "./sockets/ServerSockets.js";

import chatEventsRouter from "./routes/chatEventsRouter.js";
import gameEventsRouter from "./routes/gameEventsRouter.js";

import cors from "cors";
const port = 3001;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: ["http://localhost:3002", "http://localhost:3003"], // Allow requests only from this origin
  })
);
app.use("/", chatEventsRouter);
app.use("/", gameEventsRouter);

const httpServer = app.listen(port, () => {
  console.log(`Online Users Microservice on port ${port}`);
});

serverSocket.initialize(httpServer);
