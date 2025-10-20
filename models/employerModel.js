const mongoose = require("mongoose");


const employerSchema = new mongoose.Schema({
        email:{
            type: String,
            required: true
        },
        password:{
            type: String,
            required: true
        },
        companyName: {
            type: String,
            required: true
        },
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true  
        },
        phoneNumber: {
            type: Number,
            required: true,
            minLength: 11
        }

})


const employerModel = mongoose.model("employer", employerSchema)
module.exports = employerModel