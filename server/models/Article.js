const mongoose = require("mongoose")

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    access: {
        type: String,
        enum: ["Basic", "Standard", "Deluxe"],
        required: true,
    },
});

module.exports = mongoose.model("Article", articleSchema);