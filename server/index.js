const express = require("express")
const mongoose = require("mongoose")
const cors = require('cors')
require('dotenv').config()

const app = express()
app.use(express.json())
app.use(cors())

app.get("/", (req, res)=>{
    res.send("Working...")
})

// app.use("/auth", authRoute)
// app.use("/subs", subscriptionRoute)
// app.use(articlesRoute)

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