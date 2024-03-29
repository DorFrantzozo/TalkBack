import express from "express";
import cors from "cors";
import router from "./Routes/authRoutes.js";
import connectDB from "./config/database.js";
const app = express();
const PORT = 3000;

app.use(
  cors({
    origin: ["http://localhost:5173"], // Allow requests only from this origin
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", router);

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Example app listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
