const express = require('express')
const connectDB = require('./config/db');
const userRouter = require('./routes/userRoutes');
require('dotenv').config();


const app = express()



app.use(express.json());
app.use("/api/user", userRouter)

const PORT = process.env.PORT || 6000

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
    connectDB()
})