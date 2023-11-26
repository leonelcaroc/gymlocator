import express from "express";
const router = express.Router();
import {
  authOwner,
  // registerOwnerStepOne,
  // registerOwnerStepTwo,
  // registerOwnerStepThree,
  registerOwner,
  logoutOwner,
  getOwnerProfile,
  updateOwnerProfile,
} from "../controllers/gymOwnerController.js";
import { protect } from "../middleware/authMiddleware.js";

// router.post("/details", registerOwnerStepOne);
// router.post("/info", registerOwnerStepTwo);
// router.post("/permit", registerOwnerStepThree);
router.post("/register", registerOwner);
router.post("/auth", authOwner);
router.post("/logout", logoutOwner);
router
  .route("/profile")
  .get(protect, getOwnerProfile)
  .put(protect, updateOwnerProfile);

export default router;
