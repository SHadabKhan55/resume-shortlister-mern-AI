const express = require("express")
const route = express.Router()
const {jobPost, getJobs, getSingleJob, applyJob} = require("../controller/mainController")
const upload = require("../services/fileHandle")
route.post("/create-job",jobPost)
route.get("/get-job",getJobs)
route.get("/job/:id", getSingleJob);
route.post(
  "/apply-job",
  upload.single("resume"),
  applyJob
);

module.exports = {
    route
}