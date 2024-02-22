class productsController {
    constructor(productService){
        this.productService = productService;
    }

    async createProduct(req, res){
        try{
            const product = req.body;
            await this.productService.createProduct(product);
            res.status(201).json({ message: 'Producto creada' });
        }catch(error){
            res.status(500).json({ error: error.message });
        }
    }

}

module.exports = productsController;