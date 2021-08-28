const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types

const cardSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    pin: {
        type: Number,
        required: true
    },
    createdBy: {
        type: ObjectId,
        ref: "User"
    }
})

mongoose.model("Card", cardSchema);