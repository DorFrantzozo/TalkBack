import express from "express";
import cors from "cors";
import router from "./routes/gameRoutes.js";
const app = express();
const PORT = 3003;

app.use(
  cors({
    origin: ["http://localhost:5173"], // Allow requests only from this origin
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", router);
app.listen(PORT, () => {
  console.log(`Game MicroService on port ${PORT}`);
});
