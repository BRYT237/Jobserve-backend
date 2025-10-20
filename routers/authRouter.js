const express = require('express');
const authRouter = express.Router()
const jwt = require("jsonwebtoken")
const { signUpHandler, loginHandler } = require("../controllers/authController");
const userModel = require('../models/userModel');




authRouter.post("/", signUpHandler)
authRouter.post("/login", loginHandler)
authRouter.post("/verify-auth", async (req, res) => {
    try {
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1]
        }

        if (!token) {
            return res.status(400).json({
                status: "Error",
                message: "No token found"
            })
        }

        const { userId } = jwt.verify(token, process.env.JWT_SECRET)
        // console.log(id)

        const user = await userModel.findById(userId)
        if (!user) {
            return res.status(404).json({
                status: "Error",
                message: "Invalid token"
            })
        }

       return res.status(200).json({
            Message: "Token Verfied",
            Status: "Success",
            user

        })
    } catch (error) {
        console.log(error)
    }
})





module.exports = authRouter