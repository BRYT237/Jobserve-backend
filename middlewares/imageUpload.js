const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary")



const  storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "logos",
        allowedFormat: ["jpg", "jpeg", "gif", "png"],
        transformation: [{width: 500, height: 500}]
    }
})


const logoImageUpload = multer({ storage });
module.exports = logoImageUpload 