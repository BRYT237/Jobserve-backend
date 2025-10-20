const mongoose = require('mongoose');

const jobApplicationSchema = new mongoose.Schema({
  applicantName: {
    type: String,
    required: true,
    trim: true
  },
  applicantEmail: {
    type: String,
    required: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address']
  },
  resumeUrl: {
    type: String,        
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'reviewed', 'accepted', 'rejected'],
    default: 'pending'
  },
  appliedAt: {
    type: Date,
    default: Date.now
  }
});


const jobAppModel = mongoose.model("Application", jobApplicationSchema);
module.exports = jobAppModel