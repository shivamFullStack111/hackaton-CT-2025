const express = require("express")
const { createProfile, updateProfile, getProfile } = require("../controller/userProfileController")

const userProfileRouter = express.Router();

// Routes
userProfileRouter.post("/initialize-profile", createProfile);
userProfileRouter.put("/update-profile/:userId", updateProfile);
userProfileRouter.get("/get-profile/:userId", getProfile);

module.exports = { userProfileRouter };
