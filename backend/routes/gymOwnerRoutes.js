import express from "express";
import path from "path";
const router = express.Router();
import {
  authOwner,
  registerOwner,
  logoutOwner,
  getOwnerDashboard,
  getOwnerProfile,
  updateOwnerProfile,
  getGymDetails,
  updateGymDetails,
  getGymServices,
  addGymServices,
  updateGymServices,
  deleteGymServices,
  getGymAmenities,
  addGymAmenities,
  updateGymAmenities,
  deleteGymAmenities,
  getGymEquipments,
  addGymEquipments,
  updateGymEquipments,
  deleteGymEquipment,
  addGymPlans,
  getGymPlans,
  addGymTrainers,
  getGymTrainers,
  getStripePrices,
  addGymAnnouncement,
  getGymAnnouncement,
  addGymClasses,
  getGymClasses,
} from "../controllers/gymOwnerController.js";
import { protectOwner } from "../middleware/gymOwnerAuthMiddleware.js";
import multer from "multer";

const multerUpload = (pathFolder) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const destinationPath = `backend/uploads/${req.user._id}/${pathFolder}`;

      console.log(req.user._id);
      console.log(req.body.serviceName);
      console.log(req.body.description);
      console.log(file);

      // cb(null, destinationPath);
    },
    filename: (req, file, cb) => {
      cb(
        null,
        file.fieldname + "_" + Date.now() + path.extname(file.originalname)
      );
    },
  });

  const upload = multer({
    storage: storage,
  });

  return upload;
};

router.post(
  "/register",
  // upload.single("file"),
  registerOwner
);
router.post("/auth", authOwner);
// router.post("/logout", logoutOwner);
router.route("/dashboard").get(protectOwner, getOwnerDashboard);
router
  .route("/profile")
  .get(protectOwner, getOwnerProfile)
  .put(protectOwner, updateOwnerProfile);
router
  .route("/gymdetails")
  .get(protectOwner, getGymDetails)
  .put(protectOwner, updateGymDetails);
router
  .route("/services")
  .get(protectOwner, getGymServices)
  .post(
    protectOwner,
    // multerUpload("services").single("serviceImage"),
    addGymServices
  )
  .put(protectOwner, updateGymServices)
  .delete(protectOwner, deleteGymServices);
router
  .route("/amenity")
  .get(protectOwner, getGymAmenities)
  .post(protectOwner, addGymAmenities)
  .put(protectOwner, updateGymAmenities)
  .delete(protectOwner, deleteGymAmenities);
router
  .route("/equipments")
  .get(protectOwner, getGymEquipments)
  .post(protectOwner, addGymEquipments)
  .put(protectOwner, updateGymEquipments)
  .delete(protectOwner, deleteGymEquipment);

// .put(protectOwner, addGymEquipments);
// router
//   .route("/plans")
//   .get(protectOwner, getGymPlans)
//   .put(protectOwner, addGymPlans);

// router
//   .route("/trainers")
//   .get(protectOwner, getGymTrainers)
//   .put(protectOwner, addGymTrainers);

// router
//   .route("/announcement")
//   .get(protectOwner, getGymAnnouncement)
//   .put(protectOwner, addGymAnnouncement);
// router
//   .route("/classes")
//   .get(protectOwner, getGymClasses)
//   .put(protectOwner, addGymClasses);
// router.route("/prices").get(protectOwner, getStripePrices);

export default router;
