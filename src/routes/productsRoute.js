const express = require("express");
const ProductController = require("../controllers/productsController");
const ProductService = require('../services/productService');
const ProductRepository = require('../persistence/productRepository');


const router = express.Router();
const productRepository = new ProductRepository();
const productService = new ProductService(productRepository);
const productController = new ProductController(productService);

router.post('/api/v1/product', productController.createProduct.bind(productController));

module.exports = router;