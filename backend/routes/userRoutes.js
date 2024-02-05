import express from "express";
const router = express.Router();
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUserSubscriptions,
} from "../controllers/userController.js";
import { protectUser } from "../middleware/authMiddleware.js";

router.post("/register", registerUser);
router.post("/auth", authUser);
router.post("/logout", logoutUser);
router
  .route("/profile")
  .get(protectUser, getUserProfile)
  .put(protectUser, updateUserProfile);
router.route("/subscriptions").get(protectUser, getUserSubscriptions);
// .put(protectUser, updateUserProfile);
export default router;
