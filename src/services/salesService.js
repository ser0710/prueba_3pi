const Sale = require("../entities/sales")
const emptyError = require("../errors/emptyError")

class salesService{
    constructor(salesRepository){
        this.salesRepository = salesRepository;

    }

    async createSale(sale){
        var errors = [];
        for (var prop in sale) {
            if(sale[prop] === ""){
                errors.push(prop);
            }
            if(sale[prop] && typeof sale[prop] !== 'number'){
                if(sale[prop].trim().length === 0){
                    errors.push(prop);
                } 
            }
            if(typeof sale[prop] === 'number' && sale[prop]<0){
                throw new Error("El precio no puede ser negativo");
            }
        }
        if(errors.length > 0){
            throw new emptyError(`El ${errors} no puede ser vacio`, 500)
        }
        const newSale = new Sale(null, sale.products_id, sale.qty, sale.users_id);
        try{
            await this.salesRepository.createSale(newSale);
        }catch(error){
            throw error;
        }
    }
}

module.exports = salesService;