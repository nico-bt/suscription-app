const express = require("express")
const mongoose = require("mongoose")
const cors = require('cors')
require('dotenv').config()
const path = require("path")

const app = express()
app.use(express.json())
app.use(cors())

// Limiting number of request to the API
const rateLimit = require('express-rate-limit')
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})
app.use(limiter)

// Routes
app.use("/api/auth", require("./routes/auth"))
app.use("/api/subs", require("./routes/subscription"))
app.use("/api/articles", require("./routes/articles"))

// For production - Serving the frontend
if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "..", "client", "build")))
    app.get("*", (req, res)=>{
        res.sendFile(path.join(__dirname, "..", "client", "build", "index.html"))
    })
}

const main = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        app.listen(process.env.PORT || 8080, () => {
            console.log("Running app...")
        })
    } catch (error) {
        console.log(error)
    }
}

main()