const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    vendorId: [{ type: mongoose.Types.String.ObjectId, ref: "user" }],
    name: String,
    description: String,
    category: String,
    price: Number,
    images: [String],
    inventory: Number,

},
    {
        timestamps: true,
    }
)

const productModel = mongoose.model("product", productSchema)

module.exports = productModel