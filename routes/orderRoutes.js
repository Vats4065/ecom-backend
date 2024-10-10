const express = require('express')
const { createOrder, updateOrderStatus, deleteOrder, getAllOrder, getAllOrderByStatus } = require('../controllers/orderController')

const orderRouter = express.Router()

orderRouter.post("/create-order", createOrder)
orderRouter.patch('/update-order-status', updateOrderStatus)
orderRouter.delete('/delete-order/:id', deleteOrder)
orderRouter.get("/all-order", getAllOrder)
orderRouter.get("/order-by-status", getAllOrderByStatus)

module.exports = orderRouter