const mongoose = require("mongoose")

const useSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: Number,
        required: true,

    },
    address: {
        type: String,
        required: true,
    },
    role: {
        type: Number,
        default: 0
    },
    password: {
        type: String,
        required: true,

    }

},
    { timestamps: true }
)

module.exports = mongoose.model('users', useSchema)