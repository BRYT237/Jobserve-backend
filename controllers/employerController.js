const employerModel = require("../models/employerModel")
const jobModel = require("../models/jobModel")
const jwt = require("jsonwebtoken");



const Signup = async (req, res) => {
    try {
        const employer = await employerModel.create({...req.body})

        const info = {
            email: employer.email,
            password: employer.password,
            company: employer.companyName,
            firstName: employer.firstName,
            lastName: employer.lastName,
            id: employer.id
        }

        if (!employer) {
            res.status(404).json({
                status: "Error",
                message: "Account Creation failed!!"
            })
        }

        return res.status(201).json({
            status: "Success",
            message: "Account Created Successfully.",
            employer: info  
        })
    } catch (error) {
        console.log(error);
    }
}


const  Login = async (req, res)=> {
     const {email, password} = req.body

    try {
        const user = await employerModel.findOne({ email }).select("+password")

        if (!user) {
            return res.status(404).json({
                status: "Error",
                message: "Email or Password is incorrect"
            })
        }


        const token =  jwt.sign({ userId: user.id, email: user.email}, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_SECRET_EXP
        })

        return res.status(200).json({
            status: "Success",
            message: "Login Successful",
            token
        })

    } catch (error) {
        console.log(error)
    }
}


const addJob = async (req, res) => {
    const imagE = req.file

    if (!imagE) {
        return res.status(400).json({
            status: "Error",
            message: "File not found"
        })
    }
    try {
        const job = await jobModel.create({...req.body, companyLogo: imagE.path});
        if (!job) {
            return res.status(400).json({    
                status: "Error",
                message: "Job not Created!!"   
            })
        }


        return res.status(201).json({
            status:"Success",
            message: "Job Created Successfully.",
            job
        })
    } catch (error) {
        console.log(error)
    }
}

const updateJob = async(req, res) => {
        const { id } = req.params 
    try {
        const update = await jobModel.updateOne({ id })

        if (!update) {
            return res.status(400).json({
                status: "Error",
                message: "Failed to update Job Info!!"
            })
        }

        return res.status(200).json({
            status: "Success",
            message: "Job info updated Successfully.",
            update
        })
    } catch (error) {
        console.log(error)
    }
}

const deleteJob = async (req, res) => {
        const { id } = req.params
    try {
        const Delete = await jobModel.findByIdAndDelete({ _id: id })       

        if (!Delete) {
            return res.status(404).json({
                status: "Error",
                message: "Job Deletion Failed!!"
            })
        }


        return res.status(201).json({
            status: "Success",
            message: "Job Deleted Successfully",
            Delete
        })
    } catch (error) {
        console.log(error)
    }
}

const getJobs = async (req, res) => {
    try {
        const recieve = await jobModel.find();
        
        if (!recieve) {
            res.status(404).json({
                status: "Error",
                message: "Unable to get Jobs!!"
            })
        }

        return res.status(201).json({
            status: "Success",
            message: "Jobs Fetched.",
            recieve
        })

    } catch (error) {
        console.log(error)
    }
}

const getSingleJob = async (req, res) => {
    const { jobId } = req.params
    try {
        const recieve = await jobModel.findById(jobId);

         if (!recieve) {
            res.status(404).json({             
                status: "Error",
                message: "Unable to get Job!!"
            })
        }

        return res.status(201).json({
            status: "Success",
            message: "Job Fetched.",
            recieve
        })

    } catch (error) {
        console.log(error)
    }
}   



module.exports = {
    Signup,
    addJob,
    updateJob,
    deleteJob,
    getJobs,
    getSingleJob,
    Login
}