const mongoose = require('mongoose');
const validator = require("validator");

const orderSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "user",
        required: true
    },
    name: {
        type: String,
        required: true,
        minlength: [3, "Your name must be more than three characters"],
    },
    email: {
        type: String,
        validate: [validator.isEmail, "Enter valid email address"],
        required: true,
    },
    pincode: {
        type: String,
        minlength: [6, "Pincode must have 6 characters"],
        maxlength: [6, "Pincode not more than 6 characters"],
        required: true,
    },
    phone: {
        type: String,
        minlength: [10, "Phone Number must have 10 characters"],
        maxlength: [10, "Pincode not more than 10 characters"],
        required: true,
    },
    orderId: {
        type: String,
        required: true
    },
    paymentInfo: {
        type: String,
        default: ''
    },
    products: {
        type: Object,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        default: 'Pending',
        required: true
    }
}, { timestamps: true });

mongoose.models = {};
export default mongoose.model("order", orderSchema);