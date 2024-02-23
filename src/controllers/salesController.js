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

    async listSales(req, res){
        try{
            const result = await this.saleService.listSales();
            res.status(200).json(result);
        }catch(error){
            res.status(500).json({ error: error.message })
        }
    }

    async deleteSale(req, res){
        try{
            const saleId = req.params.saleId;
            await this.saleService.deleteSale(saleId);
            res.status(200).json({ message: 'Venta eliminada' });
        }catch(error){
            res.status(error.status).json({ error: error.message });
        }
    }

}

module.exports = salesController;