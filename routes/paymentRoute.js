const express = require('express');
const { checkOut } = require('../controllers/paymentController');

const paymentRouter = express.Router()

paymentRouter.post("/check", checkOut)

module.exports = paymentRouter;