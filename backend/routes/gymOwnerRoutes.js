import express from "express";
const router = express.Router();
import {
  authOwner,
  registerOwnerStep,
  logoutOwner,
  getOwnerProfile,
  updateOwnerProfile,
  addNewGym,
} from "../controllers/gymOwnerController.js";
import { protectOwner } from "../middleware/gymOwnerAuthMiddleware.js";

router.post("/register", registerOwnerStep);
router.post("/auth", authOwner);
router.post("/logout", logoutOwner);
router.post("/addgym", protectOwner, addNewGym);
router
  .route("/profile")
  .get(protectOwner, getOwnerProfile)
  .put(protectOwner, updateOwnerProfile);

export default router;
