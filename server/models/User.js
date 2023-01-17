const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        min: 5
    },
    customerStripeId: {
        type: String,
        required: true
    }
}, {timestamps:true})

const User = mongoose.model("User", UserSchema)

module.exports = User