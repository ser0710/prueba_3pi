const express = require("express");
const ReportsController = require("../controllers/reportsController");
const ReportsService = require('../services/reportService');
const ReportsRepository = require('../persistence/reportRepository');
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
const reportsRepository = new ReportsRepository();
const reportsService = new ReportsService(reportsRepository);
const reportsController = new ReportsController(reportsService);

router.get('/api/v1/reports/daily', verify, reportsController.dailyReport.bind(reportsController));
router.get('/api/v1/reports/monthly', verify, reportsController.monthlyReport.bind(reportsController));

module.exports = router;