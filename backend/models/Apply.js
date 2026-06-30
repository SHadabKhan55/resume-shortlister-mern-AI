const mongoose = require("mongoose")
const applySchema = new mongoose.Schema(
  {
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },

    fullName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    resume: {
      type: String, // uploaded file path
      required: true,
    },

    atsScore: {
      type: Number,
      default: 0,
    },

    aiFeedback: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: [
        "Pending",
        "Shortlisted",
        "Rejected",
        "Interview"
      ],
      default: "Pending",
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("apply",applySchema)