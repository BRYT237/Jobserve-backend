const jobAppModel = require("../models/jobApplicationModel");
const jobModel = require("../models/jobModel");
const savedJobModel = require("../models/savedJobModel");



const addJobApp = async (req, res) => {
    const file = req.file;

    if (!file) {   
        return res.status(404).json({
            status: "Error",
            message: "File not found!!"   
        })
    }

    try {
        const apply = await jobAppModel.create({...req.body,  resumeUrl: file.path});
         if (!apply) {
                res.status(400).json({
                    status: "Error",
                    message: "Job Application failed!!"
                })
         }

         return res.status(200).json({
            status: "Success",
            message: "Job Application successful"
         })
    } catch (error) {
        console.log(error)
    }
}

    const getJobApps = async(req, res) =>{
        try {
            const Get = await jobAppModel.find();

            if (!Get) {
                res.status(404).json({
                    status: "Error",
                    message: "Unable to Get Job Applications!!"
                })
            }

            return res.status(201).json({
                status: "Success",
                message: "Job Applications fetched.",
                Get
            })

        } catch (error) {
            console.log(error)
        }
    }

const savedJobs = async (req, res) => {

    try {
        const saved = await savedJobModel.create({...req.body});

        if (!saved) {
            return res.status(400).json({
                status: "Error",
                message: "Job not Saved"
            })
        }

        return res.status(201).json({
            status: "Success",
            message: "Job Saved"
        })
        

    } catch (error) {
        console.log(error)
    }
}


module.exports = {
    addJobApp,
    savedJobs,
    getJobApps
}