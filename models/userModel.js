const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    name: String,
    address: {
        street: String,
        city: String,
        state: String,
        country: String,
        zipCode: String
    },
    phone: String,
    role: { type: String, enum: ['customer', 'vendor', 'admin'], default: "customer" },

},
    {
        timestamps: true,
    }
)

const userModel = mongoose.model("user", userSchema)

module.exports = userModel