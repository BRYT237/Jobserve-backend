const express = require("express");
const {Signup, addJob, updateJob, deleteJob, getJobs, getJobs2, getSingleJob, Login, deleteJobs} = require("../controllers/employerController");
const employerRouter = express.Router()
const logoImageUpload = require("../middlewares/imageUpload.js");
const  isLoggedIn  = require("../middlewares/isLoggedIn.js");



employerRouter.post("/", Signup);
employerRouter.post("/login", Login);
employerRouter.post("/job", isLoggedIn, logoImageUpload.single("companyLogo"), addJob)  
employerRouter.patch("/update/:id", updateJob);
employerRouter.delete("/del/:id", deleteJob);  
employerRouter.delete("/All", deleteJobs)
employerRouter.get("/get", getJobs);
employerRouter.get("/get2", getJobs2);
employerRouter.get("/find/:jobId", getSingleJob)
  

module.exports = employerRouter                 