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

    async monthlyReport(month){
        var year = month.split("-")[0];
        var mon = month.split("-")[1];
        const initDate = `${year}-${mon}-01`;
        const lastDay = new Date(year, mon, 0).getDate();
        const finDate = `${year}-${mon}-${lastDay}`;
        try{
            var result = await this.reportsRepository.monthlyReport(initDate, finDate);
            var count = 0
            for(let i = 0; i<result.length; i++){
                count += result[i].total
            }
            var total = { total: count }
            return total;
        }catch(error){
            throw new Error(error.message)
        }


    }
}

module.exports = reportsService;