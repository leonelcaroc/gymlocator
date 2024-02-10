import express from "express";
const router = express.Router();
import { authTrainer } from "../controllers/trainerController.js";
import { protectTrainer } from "../middleware/authTrainerMiddleware.js";

router.post("/auth", authTrainer);
// router.get("/classes", protectTrainer, authTrainer);

export default router;
