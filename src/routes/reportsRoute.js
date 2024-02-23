const express = require("express");
const ReportsController = require("../controllers/reportsController");
const ReportsService = require('../services/reportService');
const ReportsRepository = require('../persistence/reportRepository');


const router = express.Router();
const reportsRepository = new ReportsRepository();
const reportsService = new ReportsService(reportsRepository);
const reportsController = new ReportsController(reportsService);

router.get('/api/v1/reports/daily', reportsController.dailyReport.bind(reportsController));

module.exports = router;