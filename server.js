const express = require("express")
const dotenv = require("dotenv")
const app = express();
const connectToDb = require("./config/connectToDb.js")
connectToDb()
const cors = require("cors");
const morgan = require("morgan")

require("./config/nodemailerTransporter.js")


dotenv.config()
app.use(express.json())

app.use(cors());  
  
app.use(morgan("dev"))   


const PORT = process.env.PORT;

app.listen(PORT, ()=> {
    console.log(`Running on port ${PORT}`)
})

const employerRouter = require("./routers/employerRouter.js")
app.use("/employ", employerRouter)


const jobAppRouter = require("./routers/jobAppRouter.js")
app.use("/user", jobAppRouter)


const authRouter = require("./routers/authRouter.js");
app.use("/auth", authRouter)