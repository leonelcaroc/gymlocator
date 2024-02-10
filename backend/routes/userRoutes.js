import express from "express";
const router = express.Router();
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUserSubscriptions,
  // cancelSubscription,
  getUserClasses,
  getGyms,
  userJoinGym,
  userJoinClass,
  userWithdrawClass,
} from "../controllers/userController.js";
import { protectUser } from "../middleware/authMiddleware.js";

router.post("/register", registerUser);
router.post("/auth", authUser);
router.post("/logout", logoutUser);
router
  .route("/profile")
  .get(protectUser, getUserProfile)
  .patch(protectUser, updateUserProfile);
router.route("/subscriptions").get(protectUser, getUserSubscriptions);
// .patch(protectUser, cancelSubscription);
router.route("/classes").get(protectUser, getUserClasses);
router.route("/join").post(protectUser, userJoinGym);
router.route("/gyms").get(protectUser, getGyms);
router
  .route("/joinclass")
  .post(protectUser, userJoinClass)
  .patch(protectUser, userWithdrawClass);

export default router;
