import express from "express";
import userSocket from "./sockets/user/userSocket.js";
import router from "./routes/handleChatRouter.js";
import cors from "cors";
const port = 3001;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: ["http://localhost:3002"], // Allow requests only from this origin
  })
);
app.use("/", router);
const httpServer = app.listen(port, () => {
  console.log(`Express server is running on port ${port}`);
});

userSocket.initialize(httpServer);
