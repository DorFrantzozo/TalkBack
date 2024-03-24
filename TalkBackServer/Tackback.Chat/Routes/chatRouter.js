import { Router } from "express";

const router = Router();

router.post("/sendmessage", async (req, res) => {
  try {
    const response = await fetch("http://localhost:3001", {
      method: "POST",
      body: req.body,
    });
    const result = await response.json();
    res.status(200).json(result);
    console.log("Success: ", result);
  } catch (error) {
    console.log("Error: ", error);
    res.status(400);
  }
});

export default router;
