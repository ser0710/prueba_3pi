class reportsController{
    constructor(reportsService){
        this.reportsService = reportsService;
    }

    async dailyReport(req, res){
        try{
            const day = req.body.day
            const result = await this.reportsService.dailyReport(day);
            res.status(200).json(result);
        }catch(error){
            res.status(500).json({ error: error.message });
        }

    }

    async monthlyReport(req, res){
        try{
            const month = req.body.month
            const result = await this.reportsService.monthlyReport(month);
            res.status(200).json(result);
        }catch(error){
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = reportsController;