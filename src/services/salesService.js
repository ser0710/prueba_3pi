const sale = require("../entities/sales")

class salesService{
    constructor(salesRepository){
        this.salesRepository = salesRepository;

    }

    addSale(sale){
        const newSale = new sale();
    }
}

module.exports = salesService;