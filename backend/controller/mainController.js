const Job = require("../models/Job");
const Application = require("../models/Apply")
async function jobPost(req, res) {
  try {
    const {
      title,
      description,
      requirements,
      skills,    
      salaryMin,
      salaryMax,
      jobType,
      location,
      workMode,
      vacancies,   
      applicationDeadline,
    } = req.body;


    const newJob = await Job.create({
      title,
      description,
      requirements,
      skills,    
      salaryMin,
      salaryMax,
      jobType,
      location,
      workMode,
      vacancies,   
      applicationDeadline,
    });

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

    const application = await Application.create({
      jobId,
      fullName,
      email,
      resume: req.file.path,
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