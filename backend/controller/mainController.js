const Job = require("../models/Job");
const Application = require("../models/Apply")
const pdf = require("pdf-parse");
const { pdfTotext } = require("../services/pdfTotext");
const { analyzeResume } = require("../services/analyzResume");
async function jobPost(req, res) {
  try {


    const newJob = await Job.create(req.body);

    return res.status(201).json({
      success: true,
      message: "Job posted successfully",
      job: newJob,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

async function getJobs(req, res) {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: jobs.length,
      jobs,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

async function getSingleJob(req, res) {
  try {
    const { id } = req.params;

    const job = await Job.findById(id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    return res.status(200).json({
      success: true,
      job,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}



async function applyJob(req, res) {
  try {
    const { jobId, fullName, email } = req.body;

    // Validate
    if (!jobId || !fullName || !email) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Resume is required",
      });
    }

    // Find Job
    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    const resumeText = await pdfTotext(req.file.path);

    const aiResult = await analyzeResume(job, resumeText.text);

    const cleanedResult = aiResult
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const parsedResult = JSON.parse(cleanedResult);

    const atsScore = parsedResult.score;
    const aiFeedback = parsedResult.feedback;

    let status = "Rejected";

    if (atsScore >= 80) {
      status = "Shortlisted";
    } else if (atsScore >= 60) {
      status = "Pending";
    }

    const application = await Application.create({
      jobId,
      fullName,
      email,
      resume: req.file.filename,
      atsScore,
      aiFeedback,
      status,
    });

    return res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      application,
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

module.exports = {
  jobPost,
  getJobs,
  getSingleJob,
  applyJob,
};