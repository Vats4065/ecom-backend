const express = require('express');
const { addProduct, updateProduct, getAllProduct, getProductById, getProductBySearch, getProductByCategory } = require('../controllers/productController');

const productRouter = express.Router();

productRouter.post("/add-product", addProduct)
productRouter.patch("/update-product/:id", updateProduct)
productRouter.delete("/delete-product/:id", deleteProduct)
productRouter.get("/get-product", getAllProduct)
productRouter.get("/get-product/:id", getProductById)
// productRouter.get("/get-product", getProductBySearch)
productRouter.get("/get-product/category=:category", getProductByCategory)

module.exports = productRouter;