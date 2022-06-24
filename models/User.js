require('dotenv').config()
const mongoose = require('mongoose');
const validator = require("validator");
const jwt = require('jsonwebtoken');


const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: [20, "Your name length reached at max"],
        minlength: [3, "Your name must be more than three characters"],
        required: true
    },
    email: {
        type: String,
        unique: true,
        validate: [validator.isEmail, "Enter valid email address"],
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        default: ""
    },
    pincode: {
        type: String,
        default: ""
    },
    address: {
        type: String,
        default: ""
    },
}, { timestamps: true });

userSchema.methods.getJWTTOKEN = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRETKEY, {
        expiresIn: process.env.JWT_EXPIRESIN
    });
}

mongoose.models = {};
export default mongoose.model("user", userSchema);