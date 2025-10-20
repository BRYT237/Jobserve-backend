const mongoose = require("mongoose");


const authSchema = new mongoose.Schema({
    name :{
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
        select: true
    },
    phone: {
        type: Number,
        required: true
    }
})


const userModel = mongoose.model("auth", authSchema);
module.exports = userModel      