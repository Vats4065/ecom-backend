const express = require('express')
const { signup, login, refreshToken } = require('../controllers/userController')

const userRouter = express.Router()

userRouter.post("/signup", signup)
userRouter.post("/login", login)
userRouter.post("/refresh-token", refreshToken)

module.exports = userRouter