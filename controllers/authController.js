const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const sendEmail = require("../utils/sendEmail")



const signUpHandler = async (req, res)=> {
    const {password, confirmPassword} = req.body;

    if (password !== confirmPassword) {
            return res.status(400).json({
                status: "Error",
                message: "Passwords do not match"
            })
        }


    try {  
    
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)
        const user = await userModel.create({...req.body, password: hash});


        sendEmail(user.email, user.name)
            const result = {
            name:  user.name,
            email:  user.email,
            id: user.id
             }
  
        if (!user) {
            res.status(404).json({
                status: "error",
                message: "Sign Up failed!!"   
            })
        }

        return res.status(201).json({
            status: "Success",
            message: "Signup Successful.",
            user: result          
        })
    } catch (error) {
        console.log(error);
    }    
}

const loginHandler = async (req,res) => {
    const {email, password} = req.body

    try {
        const user = await userModel.findOne({ email }).select("+password")

        if (!user) {
            return res.status(404).json({
                status: "Error",
                message: "Email or Password is incorrect"
            })
        }


        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.atatus(404).json({
                status: "Error",
                message: "Password is Incorrect"
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


module.exports = {
    signUpHandler,
    loginHandler
}