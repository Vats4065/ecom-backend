const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema({
    userId: [{ type: mongoose.Types.String.ObjectId, ref: "user" }],
    vendorId: [{ type: mongoose.Types.String.ObjectId, ref: "user" }],
    serviceId: [{ type: mongoose.Types.String.ObjectId, ref: "service" }],
    date: Date.now(),
    status: Enum['pending', 'confirmed', 'in-progress', 'completed', 'cancelled'],
    totalAmount: Number,
    depositAmount: Number,
    notes: String,

}, {
    timestamps: true,
})

const bookingModel = mongoose.model('booking', bookingSchema)

module.exports = bookingModel