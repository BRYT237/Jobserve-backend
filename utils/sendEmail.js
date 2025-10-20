const transporter = require("../config/nodemailerTransporter")
const dotEnv = require("dotenv");
dotEnv.config()

const sendEmail = (email, name) => {
    transporter.sendMail({
        to: email,
        subject: "Welcome to JOBSERVE",
        html:`
            <div>
                <h2>Hello, ${name}</h2>
                <p>Welcome to JOBSERVE, kindly click the link below to login.</p>
                <a href="${process.env.clientDomain}/login">Login to my Account.</a>
            </div>
        `,
        replyTo: "diyaolutomiwa@gmail.com",
    }, (err, info)=> {
        if (err) {  
            console.log(err)
        } else {
            console.log(`Email sent!!`)
        }
    })
}


module.exports = sendEmail