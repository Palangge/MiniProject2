let productModel = require('../models/products.model');

function getAllProducts(req, res) {
    res.json(productModel);
}

function getProductById(req, res) {
    const productID = Number(req.params.productID);
    const product = productModel(productID);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({
            error: 'Product does not exist'
        })
    }
}

function addProduct(req, res) {
    if (!req.body.name) {
        return res.status(404).json({
            error: 'Missing product name'
        })
    }

    const newProduct = {
        id: productModel.length,
        name: req.body.name
    };

    productModel.push(newProduct);
    res.json(productModel);
}

function deleteProduct(req, res) {
    const productID = Number(req.params.productID);
    const filteredProducts = productModel.filter(product => product.id !== productID);
    if (filteredProducts.length < productModel.length) {
        productModel = filteredProducts.map((product, index) => ({
            ...product,
            id: index
        }));

        res.send(`Product with ID ${productID} has been deleted`);
    } else {
        res.status(404).send(`Product with ID ${productID} not found`);
    }
}

module.exports = {
    getAllProducts,
    getProductById,
    addProduct,
    deleteProduct
};