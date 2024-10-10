const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: [{ type: mongoose.Types.String.ObjectId, ref: "user" }],
    vendorId: [{ type: mongoose.Types.String.ObjectId, ref: "user" }],
    products: [{
        productId: [{ type: mongoose.Types.String.ObjectId, ref: "product" }],
        quantity: Number,
        price: Number,
    }],
    totalAmount: Number,
    status: { type: String, enum: ['pending', 'processing', 'shipped', 'delivered', 'completed', 'cancelled'] },
    shippingAddress: {
        street: String,
        city: String,
        state: String,
        country: String,
        zipCode: String
    },
    paymentId: String,
},
    {
        timestamps: true,
    })

const orderModel = mongoose.model("order", orderSchema)

module.exports = orderModel
