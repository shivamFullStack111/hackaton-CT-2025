import express from "express";
import UserProfile from "../schemas/userProfileSchema";

const router = express.Router();

router.post("/initialize-profile", async (req, res) => {
    try {
        const { userId } = req.body;

        const existingProfile = await UserProfile.findOne({ userId });
        if (existingProfile) {
            return res.status(400).json({ success: false, message: "Profile already exists!" });
        }

        const profile = new UserProfile(req.body);
        await profile.save();

        res.status(201).json({ success: true, profile });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});


router.put("/update-profile/:userId", async (req, res) => {
    try {
        const { userId } = req.params;

        const updatedProfile = await UserProfile.findOneAndUpdate(
            { userId },
            { $set: req.body },
            { new: true, runValidators: true }
        );

        if (!updatedProfile) {
            return res.status(404).json({ success: false, message: "Profile not found!" });
        }

        res.json({ success: true, profile: updatedProfile });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});


router.get("/get-profile/:userId", async (req, res) => {
    try {
        const { userId } = req.params;
        const profile = await UserProfile.findOne({ userId });

        if (!profile) {
            return res.status(404).json({ success: false, message: "Profile not found!" });
        }

        res.json({ success: true, profile });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

export default router;
