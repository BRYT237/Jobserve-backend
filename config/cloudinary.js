const cloudinary = require("cloudinary").v2
const dotenv = require("dotenv");
const { CloudinaryStorage } = require("multer-storage-cloudinary")
dotenv.config()


cloudinary.config({
    api_key: process.env.Cloudinary_apiKey,
    api_secret: process.env.Cloudinary_apiSecret,
    cloud_name: process.env.Cloudinary_name

})


module.exports = cloudinary 