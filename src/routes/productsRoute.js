const express = require("express");
const ProductController = require("../controllers/productsController");
const ProductService = require('../services/productService');
const ProductRepository = require('../persistence/productRepository');
const SecurityRepository = require('../persistence/securityRepository');

const securityRepository = new SecurityRepository();

async function verify(req, res, next){
    const userId = req.headers['auth'];
    if(!userId){
        return res.status(403).json({ message: 'ID no proporcionado' });
    }
    try{
        const validation = await securityRepository.verify(userId);
        if(validation.rows.length === 0){
            return res.status(403).json({ message: 'ID no válido' });
        }
        req.userID = userId;
        req.userRole = validation.rows[0].role;
        next();
    } catch(error){
        res.status(500).json({ message: error.message });
    }
}

const router = express.Router();
const productRepository = new ProductRepository();
const productService = new ProductService(productRepository);
const productController = new ProductController(productService);

router.post('/api/v1/product', verify, productController.createProduct.bind(productController));
router.get('/api/v1/product', productController.listProducts.bind(productController));

module.exports = router;