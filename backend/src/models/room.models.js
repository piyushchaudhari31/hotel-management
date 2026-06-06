const mongoose = require('mongoose')

const roomSchema = new mongoose.Schema(
    {
        roomNumber: {
            type: String,
            length: 6,
        },
        roomType: {
            type: String,
            enum: ["single", "double"],
            default: "single",
        },
        roomImage: {
            type: String,
        },
        price: {
            type: Number,
        },
        description: {
            type: String,
        },
        status: {
            type: String,
            enum: ["available", "maintenance"],
            default: "available",
        },
        totalMember: {
            type: String,
            enum: [2, 4],
            default: 2,
        },
    },
    { timestamps: true },
)

const roomModel = mongoose.model('room', roomSchema)

module.exports = roomModel