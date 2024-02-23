const express = require("express");
const SalesController = require("../controllers/salesController");
const SalesService = require('../services/salesService');
const SalesRepository = require('../persistence/salesRepository')
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
const salesRepository = new SalesRepository();
const salesService = new SalesService(salesRepository);
const salesController = new SalesController(salesService);

router.post('/api/v1/sales', salesController.createSale.bind(salesController));
router.get('/api/v1/sales', salesController.listSales.bind(salesController));
router.delete('/api/v1/sales/:saleId', verify, salesController.deleteSale.bind(salesController));
// router.put('/api/v1/sales/:saleId', salesController.updateSale.bind(salesController));

module.exports = router;