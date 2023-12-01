import express from "express";
const router = express.Router();
import {
  // registerAdmin,
  authAdmin,
  logoutAdmin,
  getOwners,
  //   updateAdminProfile,
} from "../controllers/adminController.js";
import { protectAdmin } from "../middleware/authAdminMiddleware.js";

// router.post("/register", registerAdmin);
router.get(
  "/owners",
  // protectAdmin,

  getOwners
);
router.post("/auth", authAdmin);
router.post("/logout", logoutAdmin);
// router.get("/owners").get(protectAdmin, getOwnersProfile);
// .put(protect, protectAdmin);

export default router;
