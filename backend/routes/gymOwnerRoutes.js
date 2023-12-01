import express from "express";
const router = express.Router();
import {
  authOwner,
  registerOwner,
  logoutOwner,
  getOwnerProfile,
  updateOwnerProfile,
  getGymDetails,
  updateGymDetails,
  addGymEquipments,
  getGymEquipments,
  addGymPlans,
  getGymPlans,
  addGymServices,
  getGymServices,
  addGymTrainers,
  getGymTrainers,
  getStripePrices,
  addGymAmenities,
  getGymAmenities,
  addGymAnnouncement,
  getGymAnnouncement,
  addGymClasses,
  getGymClasses,
} from "../controllers/gymOwnerController.js";
import { protectOwner } from "../middleware/gymOwnerAuthMiddleware.js";
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "backend/uploads/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
});

router.post("/register", upload.single("file"), registerOwner);
router.post("/auth", authOwner);
router.post("/logout", logoutOwner);
router
  .route("/gymdetails")
  .get(protectOwner, getGymDetails)
  .put(protectOwner, updateGymDetails);
router
  .route("/equipments")
  .get(protectOwner, getGymEquipments)
  .put(protectOwner, addGymEquipments);
router
  .route("/plans")
  .get(protectOwner, getGymPlans)
  .put(protectOwner, addGymPlans);
router
  .route("/services")
  .get(protectOwner, getGymServices)
  .put(protectOwner, addGymServices);
router
  .route("/trainers")
  .get(protectOwner, getGymTrainers)
  .put(protectOwner, addGymTrainers);
router
  .route("/amenity")
  .get(protectOwner, getGymAmenities)
  .put(protectOwner, addGymAmenities);
router
  .route("/announcement")
  .get(protectOwner, getGymAnnouncement)
  .put(protectOwner, addGymAnnouncement);
router
  .route("/classes")
  .get(protectOwner, getGymClasses)
  .put(protectOwner, addGymClasses);
router
  .route("/profile")
  .get(protectOwner, getOwnerProfile)
  .put(protectOwner, updateOwnerProfile);
router.route("/prices").get(protectOwner, getStripePrices);

export default router;
