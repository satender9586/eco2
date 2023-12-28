const express = require("express")
const dotenv = require('dotenv');
const morgan = require("morgan");
const connectdb = require("./config/db.js");
const authRoute = require("./routes/authRoute.js")


const app = express();

// congiguation env
dotenv.config()


// config database
connectdb()

// Middleware

app.use(express.json())
app.use(morgan('dev'))

// routes
app.use("/api/v1/auth", authRoute);

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    console.log(`server is running mode is ${process.env.DEV_MODE} and port running is on ${PORT}`)
})