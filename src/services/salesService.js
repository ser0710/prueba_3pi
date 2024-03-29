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
        const newSale = new Sale(null, sale.products_id, sale.qty, sale.users_id, null, null);
        try{
            await this.salesRepository.createSale(newSale);
        }catch(error){
            throw error;
        }
    }

    async listSales(){
        try{
            var listSales = await this.salesRepository.listSales();
            return listSales.map(data => new Sale(data.id, data.products_id, data.qty, data.users_id, data.total, data.date));
        } catch(error){
            throw new Error(error.message);
        }
    }

    async deleteSale(saleId){
        try{
            await this.salesRepository.deleteSale(saleId);
        }catch(error){
            throw error;
        }
    }

    async updateSale(saleId, data){
        // var errors = [];
        // for (var prop in data) {
        //     if(data[prop] === ""){
        //         errors.push(prop);
        //     }
        //     if(data[prop] && typeof data[prop] !== 'number'){
        //         if(data[prop].trim().length === 0){
        //             errors.push(prop);
        //         } 
        //     }
        //     if(typeof data[prop] === 'number' && data[prop]<0){
        //         throw new Error("El precio no puede ser negativo");
        //     }
        // }
        // if(errors.length > 0){
        //     throw new emptyError(`El ${errors} no puede ser vacio`, 500)
        // }
        // const newSale = new Sale(saleId, data.products_id, data.qty, data.users_id, null, null);
        // try{
        //     await this.salesRepository.updateSale(newSale);
        // }catch(error){
        //     throw error;
        // }

    }
}

module.exports = salesService;