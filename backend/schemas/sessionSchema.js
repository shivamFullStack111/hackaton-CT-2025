const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const SessionSchema = new mongoose.Schema(
  {
    roomId: {
      type: String,
      required: true,
      unique: true, // frontend se UUID aayega
    },

    ended: {
      type: Boolean,
      default: false,
      required: true,
    },
    endedDateTime: {
      type: Date,
    },

    sessionInfo: {
      title: { type: String, required: true },
      description: { type: String },
      subject: { type: String },
      gradeLevel: {
        type: String,
        enum: [
          "primary", // grade 1–5
          "middle", //  6–8
          "secondary", //  9–10
          "senior-secondary", //  11–12
          "college",
          "other",
        ],
      },
    },
    ratings:{
      type:Number
    },
    feedbacks: [
      {
        userId: mongoose.Schema.Types.ObjectId,
        rating: {
          type: Number,
          required: true,
        },
        feedbackMessage: String,
        
      },
    ],

    sessionSetting: {
      duration: { type: Number, default: 30 }, // in minutes
      maxParticipants: { type: Number, default: 50 },
    },

    privacySetting: {
      isPrivate: { type: Boolean, default: false },
      password: { type: String }, // will be hashed
    },

    sessionFeatures: {
      liveChat: { type: Boolean, default: true },
      whiteboard: { type: Boolean, default: true },
      codeEditor: { type: Boolean, default: true },
      aiCodeReview: { type: Boolean, default: false },
      recording: { type: Boolean, default: false },
    },

    participants: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        joinedAt: { type: Date, default: Date.now },
      },
    ],

    // Metadata
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

SessionSchema.pre("save", async function (next) {
  if (
    this.isModified("privacySetting.password") &&
    this.privacySetting.password
  ) {
    const salt = await bcrypt.genSalt(10);
    this.privacySetting.password = await bcrypt.hash(
      this.privacySetting.password,
      salt
    );
  }
  next();
});

const Session = mongoose.model("Session", SessionSchema);
module.exports = Session;
