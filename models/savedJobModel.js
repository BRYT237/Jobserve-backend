const mongoose = require("mongoose")

const savedJobSchema = new mongoose.Schema({
    title: {
      type: String,
      required: [true, "Job title is required"],
      trim: true,
    },

    companyName: {
        type: String,
        required: [true, "Company name is required"],
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
    applicationDeadline: {
      type: String,
    },
  },
  { timestamps: true } 
);

const savedJobModel = mongoose.model("savedJobs", savedJobSchema);
module.exports = savedJobModel    