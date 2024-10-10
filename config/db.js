const mongoose = require('mongoose');

const connectDB = async () => {
    const MONGODB_URI = process.env.MONGODB_URI
    try {
        mongoose.connect(MONGODB_URI)
        console.log('MongoDB Connected...');
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDB;