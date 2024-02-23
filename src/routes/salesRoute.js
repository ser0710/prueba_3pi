const express = require("express");
const SalesController = require("../controllers/salesController");
const SalesService = require('../services/salesService');
const SalesRepository = require('../persistence/salesRepository')


const router = express.Router();
const salesRepository = new SalesRepository();
const salesService = new SalesService(salesRepository);
const salesController = new SalesController(salesService);

router.post('/api/v1/sales', salesController.createSale.bind(salesController));
router.get('/api/v1/sales', salesController.listSales.bind(salesController));
router.delete('/api/v1/sales/:saleId', salesController.deleteSale.bind(salesController));

module.exports = router;