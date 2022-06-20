const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    userId: { type: mongoose.Schema.ObjectId, ref: "user", required: true },
    products: [{
        productId: {
            type: String
        },
        productName: {
            type: String
        },
        quantity: {
            type: Number, default: 1
        }
    }],
    address: { type: String, required: true },
    amount: { type: Number, required: true },
    status: { type: String, default: 'Pending', required: true }
}, { timestamps: true });

mongoose.models = {};
export default mongoose.model("order", orderSchema);