const orderModel = require("../models/orderModel")

exports.createOrder = async (req, res) => {
    const { userId, vendorId, products, totalPrice, status } = req.body
    try {
        if (!userId || !vendorId || !products || !totalPrice || !status) return res.status(400).json({ msg: "All fields are required" })

        const newOrder = new orderModel({ userId, vendorId, products, totalPrice, status })
        await newOrder.save()
        return res.status(200).json({ msg: "Order created successfully" });

    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
}

exports.getAllOrder = async (req, res) => {
    try {
        const order = await orderModel.find()
        return res.status(200).json({ order })

    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }

}

exports.getAllOrderByStatus = async (req, res) => {
    const { status } = req.query
    try {
        if (!status) return res.status(404).json({ msg: "Status not found" })

        const order = await orderModel.find({ status })
        if (!order) return res.status(404).json({ msg: "Order not found" })

        return res.status(200).json({ order })

    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }

}

exports.updateOrderStatus = async (req, res) => {
    const { orderId, status } = req.body
    try {
        if (!orderId || !status) return res.status(400).json({ msg: "All fields are required" })

        const updatedOrder = await orderModel.findByIdAndUpdate(orderId, { status }, { new: true })
        if (!updatedOrder) return res.status(404).json({ msg: "Order not found" })

        return res.status(200).json({ msg: "Order status updated successfully" })

    } catch (error) {
        return res.status(500).json({ msg: "Error updating order" })
    }

}

exports.deleteOrder = async (req, res) => {
    const { id } = req.params
    try {
        if (!id) return res.status(401).json({ msg: "id not found" })

        const deletedOrder = await orderModel.findByIdAndDelete(id)
        if (!deletedOrder) return res.status(404).json({ msg: "Order not found" })

        return res.status(200).json({ msg: "Order deleted successfully" })
    } catch (error) {
        return res.status(500).json({ msg: error.message })

    }
}

