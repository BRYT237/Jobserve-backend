const jwt = require("jsonwebtoken");
const employerModel = require("../models/employerModel")



const isLoggedIn = async(req, res, next) => {
    try {
        let token ;
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1]
        } 
            
        if (!token) {
            return res.status(400).json({
                status: "Error",
                message: "No token found"
            })
        }
        
        const { email } = await jwt.verify(token, process.env.JWT_SECRET)

         const user = await employerModel.findOne({ email })
        
        if (!user) {
            console.log(user)
            return res.status(404).json({
                status: "Error",
                message: "Invalid token"
            })
        }
        req.user = user

        next()

    } catch (error) {
        console.log(error)
        
    }
}


    
module.exports = isLoggedIn