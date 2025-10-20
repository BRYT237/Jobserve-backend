const express = require("express");
const {Signup, addJob, updateJob, deleteJob, getJobs, getSingleJob, Login} = require("../controllers/employerController");
const employerRouter = express.Router()
const logoImageUpload = require("../middlewares/imageUpload.js")



employerRouter.post("/", Signup);
employerRouter.post("/login", Login);
employerRouter.post("/job", logoImageUpload.single("companyLogo"), addJob)  
employerRouter.patch("/update/:id", updateJob);
employerRouter.delete("/del/:id", deleteJob);
employerRouter.get("/get", getJobs);
employerRouter.get("/find/:jobId", getSingleJob)
  

module.exports = employerRouter             