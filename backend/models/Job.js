const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {


    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    requirements: [
      {
        type: String,
      },
    ],

    skills: [
      {
        type: String,
      },
    ],

    experience: {
      type: Number, // years
      required: true,
    },

    education: {
      type: String,
    },

    salaryMin: {
      type: Number,
    },

    salaryMax: {
      type: Number,
    },

    jobType: {
      type: String,
      enum: ["Full-Time", "Part-Time", "Internship", "Contract"],
      default: "Full-Time",
    },

    location: {
      type: String,
    },

    workMode: {
      type: String,
      enum: ["Remote", "Hybrid", "Onsite"],
      default: "Onsite",
    },

    vacancies: {
      type: Number,
      default: 1,
    },

    status: {
      type: String,
      enum: ["Open", "Closed"],
      default: "Open",
    },

    applicationDeadline: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Job", jobSchema);