const mongoose = require('mongoose');
const validator = require("validator");

const forgotSchema = mongoose.Schema({
    token: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate: [validator.isEmail, "Enter valid email address"],
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        index: {
            expires: 300
        }
        // 300 is seconds
    }
}, { timestamps: true });

mongoose.models = {};
export default mongoose.model("forgot", forgotSchema);