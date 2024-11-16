const express = require("express");
const auth = require("../middleware/auth");
const upload = require("../config/cloudinaryConfig"); // The multer configuration with Cloudinary
const { createCar, getUserCars, getCarById, updateCar, deleteCar, searchCars } = require("../controllers/carController");

const router = express.Router();
//, upload.array("images", 10)
router.post("/", upload.array("images", 10),createCar);
router.get("/", auth, getUserCars);
router.get("/search", auth, searchCars);
router.get("/:id", auth, getCarById);
router.put("/:id", auth, upload.array("images", 10), updateCar);
router.delete("/:id", auth, deleteCar);

module.exports = router;
