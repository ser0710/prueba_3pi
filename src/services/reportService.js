class reportsService{
    constructor(reportsRepository){
        this.reportsRepository = reportsRepository;
    }

    async dailyReport(day){
        try{
            var result = await this.reportsRepository.dailyReport(day);
            var count = 0
            for(let i = 0; i<result.length; i++){
                count += result[i].total
            }

            var total = { total: count }
            
            
            return total;
        } catch(error){
            throw new Error(error.message)
        }
        
    }
}

module.exports = reportsService;