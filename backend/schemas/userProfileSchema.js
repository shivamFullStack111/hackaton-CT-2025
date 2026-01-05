const mongoose = require("mongoose")
const userProfileSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        fullName: {
            type: String,
            required: true,
            trim: true,
        }, 
        age: {
            type: Number,
            required: true,
        },
        currentlyPursuing: {
            type: String,
            required: true,
            trim: true,
        },
        careerInterest: {
            type: String,
            required: true,
            trim: true,
        },
        strongSubjects: {
            type: String, 
            required: true,
        },
        areasOfImprovement: {
            type: String,
            required: true,
        },
        learningPreferences: {
            type: String,
            required: true,
            trim: true,
        },
        weeklyStudyTime: {
            type: String,
            required: true,
            trim: true,
        },
    },
    {
        timestamps: true, 
    }
);

module.exports = mongoose.model("UserProfile", userProfileSchema);
