import express from "express";
import cors from "cors";
import router from "./Routes/authRoutes.js";
const app = express();
const PORT = 3004;

app.use(
  cors({
    origin: ["http://localhost:5173"], // Allow requests only from this origin
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", router);
