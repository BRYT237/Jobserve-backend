const express = require("express");
const {addJobApp, savedJobs, getJobApps} = require("../controllers/userController");
const jobAppRouter = express.Router()
const logoImageUpload = require("../middlewares/imageUpload")


jobAppRouter.post("/", logoImageUpload.single("resumeUrl") ,addJobApp)
jobAppRouter.post("/save", savedJobs)
jobAppRouter.get("/get", getJobApps)

module.exports = jobAppRouter   