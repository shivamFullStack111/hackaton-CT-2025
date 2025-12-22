const UserProfile = require("../schemas/userProfileSchema")


const createProfile = async (req, res) => {
    try {
        const { userId } = req.body;
        console.log(userId)
        const existingProfile = await UserProfile.findOne({ userId });
        if (existingProfile) {
            return res.send({ success: false, message: "Profile already exists!" });
        }

        const profile = new UserProfile(req.body.profile);
        await profile.save();

        res.status(201).json({ success: true, profile, message: "Profile Initialized Successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


const updateProfile = ("/update-profile/:userId", async (req, res) => {
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


const getProfile = ("/get-profile/:userId", async (req, res) => {
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

module.exports = {
    createProfile,
    updateProfile,
    getProfile
}
