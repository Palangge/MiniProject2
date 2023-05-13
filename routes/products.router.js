const express = require('express');
const productsController = require('../controllers/products.controller');
const productRouter = express.Router();

productRouter.get('/', productsController.getAllProducts);
productRouter.post('/', productsController.addProduct);
productRouter.get('/:productId', productsController.getProductById);
productRouter.delete('/:productId', productsController.deleteProduct);

module.exports = productRouter;