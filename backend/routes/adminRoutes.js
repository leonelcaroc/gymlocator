import express from "express";
const router = express.Router();
import {
  // registerAdmin,
  authAdmin,
  logoutAdmin,
  //   getAdminProfile,
  //   updateAdminProfile,
} from "../controllers/adminController.js";
import { protectAdmin } from "../middleware/authAdminMiddleware.js";

// router.post("/register", registerAdmin);
router.post("/auth", authAdmin);
router.post("/logout", logoutAdmin);
// router
//   .route("/profile")
//   .get(protect, protectAdmin)
//   .put(protect, protectAdmin);

export default router;
