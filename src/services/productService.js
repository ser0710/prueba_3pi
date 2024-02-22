const priceError = require("../errors/priceError")
const Product = require("../entities/products")

class productService{
    constructor(productRepository){
        this.productRepository = productRepository;

    }

    async createProduct(product){
        if(product.price < 0){
            throw new priceError('precio no valido', 500)
        }
        const newProduct = new Product(product.description, product.name, product.price);
        try{
            await this.productRepository.createProduct(newProduct);
        }catch(error){
            throw new Error('error' + error.message);
        }
    }
}

module.exports = productService;