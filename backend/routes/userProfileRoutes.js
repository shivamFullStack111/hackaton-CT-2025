const express = require("express")
const { createProfile, updateProfile, getProfile } = require("../controllers/userProfileController.js")

const router = express.Router();

// Routes
router.post("/initialize-profile", createProfile);
router.put("/update-profile/:userId", updateProfile);
router.get("/get-profile/:userId", getProfile);

export default router;
