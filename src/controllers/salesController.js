class salesController {
    constructor(saleService){
        this.saleService = saleService;
    }

    async createSale(req, res){
        try{
            const sale = req.body;
            await this.saleService.createSale(sale);
            res.status(201).json({ message: 'Venta creada' });
        }catch(error){
            res.status(error.status).json({ error: error.message });
        }
    }

}

module.exports = salesController;