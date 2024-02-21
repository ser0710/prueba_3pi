class salesController {
    constructor(saleService){
        this.saleService = saleService;
    }

    async createSale(req, res){
        try{
            const sale = req.body;
            await this.saleService.addSale(sale);
            res.status(201).json({ message: 'Venta creada' });
        }catch(error){
            res.status(500).json({ error: error.message });
        }
    }

}

module.exports = salesController;