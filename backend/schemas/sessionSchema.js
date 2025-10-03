const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const SessionSchema = new mongoose.Schema(
  {
    roomId: {
      type: String,
      required: true,
      unique: true, // frontend se UUID aayega
    },

    // Is session ended or active
    ended: {
      type: Boolean,
      default: false,
      required: true,
    },

    // Basic Information
    sessionInfo: {
      title: { type: String, required: true },
      description: { type: String },
      subject: { type: String },
      gradeLevel: {
        type: String,
        enum: [
          "primary",          // grade 1–5
          "middle",           //  6–8
          "secondary",        //  9–10
          "senior-secondary", //  11–12
          "college",
          "other",
        ],
      },
    },

    // Settings
    sessionSetting: {
      duration: { type: Number, default: 30 }, // in minutes
      maxParticipants: { type: Number, default: 50 },
    },

    // Privacy
    privacySetting: {
      isPrivate: { type: Boolean, default: false },
      password: { type: String }, // will be hashed
    },

    // Features
    sessionFeatures: {
      liveChat: { type: Boolean, default: true },
      whiteboard: { type: Boolean, default: false },
      codeEditor: { type: Boolean, default: false },
      aiCodeReview: { type: Boolean, default: false },
      recording: { type: Boolean, default: false },
    },

    // Participnts
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

// Hash session password before save
SessionSchema.pre("save", async function (next) {
  if (this.isModified("privacySetting.password") && this.privacySetting.password) {
    const salt = await bcrypt.genSalt(10);
    this.privacySetting.password = await bcrypt.hash(this.privacySetting.password, salt);
  }
  next();
});

const Session = mongoose.model("Session", SessionSchema);
module.exports = Session;
