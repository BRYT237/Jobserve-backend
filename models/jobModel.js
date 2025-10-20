const mongoose = require("mongoose")

const jobSchema = new mongoose.Schema({
    title: {
      type: String,
      required: [true, "Job title is required"],
      trim: true,
    },

    description: {
      type: String,
      required: [true, "Job description is required"],
    },
    companyName: {
        type: String,
        required: [true, "Company name is required"],
      },
    companyWebsite: {
        type: String,
      },
    companyLogo: {
        type: String, 
      },
    location: {
      type: String,
      required: [true, "Location is required"],
    }, 
    jobType: {
      type: String,
      enum: ["Full-time", "Part-time", "Contract", "Internship", "Remote"],   
      default: "Full-time",  
    },
    minWage: {
      type: Number,    
      required: true
    },
    maxWage: {
      type: Number,
      required: true
    },     
    currency:{  
      type: String,
      default: "USD"
    },    
    requirements: [
      {
        type: String, 
      },
    ],
    responsibilities: [
      {
        type: String,
      },
    ],
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "employer", 
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    applicationDeadline: {
      type: String,
    },
  },
  { timestamps: true } 
);

const jobModel = mongoose.model("Job", jobSchema);
module.exports = jobModel