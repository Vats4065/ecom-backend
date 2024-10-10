const mongoose = require("mongoose")

const serviceSchema = new mongoose.Schema({
    vendorId: [{ type: mongoose.Types.String.ObjectId, ref: "user" }],
    name: String,
    description: String,
    category: String,
    basePrice: String,
    avalibility: String,
},
    {
        timestamps: true,
    }
)

const serviceModel = mongoose.model("service", serviceSchema)

module.exports = serviceModel