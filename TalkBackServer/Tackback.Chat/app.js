import express from "express";
import router from "./Routes/chatRouter.js";
import cors from "cors";

const app = express();
const port = 3002;
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3001"], // Allow requests only from this origin
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", router);

app.listen(port, () => console.log(`Chat Microservice on port ${port}!`));
