import express from "express";
import router from "./Routes/chatRouter.js";

const app = express();
const port = 3002;

app.use(
  cors({
    origin: ["http://localhost:5173"], // Allow requests only from this origin
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", router);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
