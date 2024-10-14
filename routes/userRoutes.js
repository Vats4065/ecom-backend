const express = require('express')
const { signup, login, refreshToken, sendOtp, verifyOtp } = require('../controllers/userController')

const userRouter = express.Router()

userRouter.post("/signup", signup)
userRouter.post("/login", login)
userRouter.post("/refresh-token", refreshToken)
userRouter.post("/send-otp", sendOtp)
userRouter.post("/verify-otp", verifyOtp)

module.exports = userRouter