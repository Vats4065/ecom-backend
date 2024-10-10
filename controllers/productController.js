const productModel = require("../models/productModel")

exports.addProduct = async (req, res) => {
    const { vendorId, name, description, category, price, images, inventory } = req.body
    try {
        if (!vendorId || !name || !description || !category || !price || !images || !inventory) return red.status(400).json({ msg: "All fields are required" })

        const newProduct = new productModel({ vendorId, name, description, category, price, images, inventory })
        await newProduct.save()
        return res.status(200).json({
            msg: "Product saved successfully"
        });


    } catch (error) {
        return res.status(500).json({ msg: error.message })

    }
}

exports.updateProduct = async (req, res) => {
    const { id } = req.params
    const { name, description, category, price, images, inventory } = req.body
    try {
        if (!id || !name || !description || !category || !price || !images || !inventory) return res.status(400).json({ msg: "All fields are required" })

        const updatedProduct = await productModel.findByIdAndUpdate(id, { name, description, category, price, images, inventory }, { new: true })
        if (!updatedProduct) return res.status(404).json({ msg: "Product not found" })

        return res.status(200).json({ msg: "Prodct update sucessfully" })
    } catch (error) {
        return res.status(500).json({ msg: error.message })

    }
}

exports.deleteProduct = async (req, res) => {
    const { id } = req.params
    try {
        const deletedProduct = await productModel.findByIdAndDelete(id)
        if (!deletedProduct) return res.status(404).json({ msg: "Product not found" })

        return res.status(200).json({ msg: "Product deleted successfully" })
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }

}

exports.getAllProduct = async (req, res) => {

    try {
        const product = await productModel.find()
        return res.status(200).json({ product })

    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
}

exports.getProductById = async (req, res) => {
    const { id } = req.params
    try {
        const product = await productModel.findById(id)
        if (!product) return res.status(404).json({ msg: "Product not found" })
        return res.status(200).json({ product })

    } catch (error) {
        return res.status(500).json({ msg: "Product not found" })
    }
}


exports.getProductByCategory = async (req, res) => {
    const { category } = req.query
    try {
        if (!category) return res.status(404).json({ msg: "category not found" })

        const product = await productModel.find({ category })
        if (!product) return res.status(404).json({ msg: "Product not found" })

        return res.status(200).json({ product })

    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }

}

exports.getProductBySearch = async (req, res) => {
}