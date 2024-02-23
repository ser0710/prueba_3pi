const priceError = require("../errors/priceError")
const Product = require("../entities/products")
const emptyError = require("../errors/emptyError")

class productService{
    constructor(productRepository){
        this.productRepository = productRepository;

    }

    async createProduct(product){
        var errors = [];
        for (var prop in product) {
            if(product[prop] === ""){
                errors.push(prop);
            }
            if(product[prop] && typeof product[prop] !== 'number'){
                if(product[prop].trim().length === 0){
                    errors.push(prop);
                } 
            }
            if(typeof product[prop] === 'number' && product[prop]<0){
                throw new priceError('precio no valido', 500)
            }
        }
        if(errors.length > 0){
            throw new emptyError(`El ${errors} no puede ser vacio`, 500)
        }
        const newProduct = new Product(null, product.description, product.name, product.price);
        try{
            await this.productRepository.createProduct(newProduct);
        }catch(error){
            throw new Error('error' + error.message);
        }
    }

    async listProducts(){
        try{
            var listProducts = await this.productRepository.listProducts();
            return listProducts.map(data => new Product(data.id, data.descripti, data.name_p, data.price))
        }catch(error){
            throw new Error('error' + error.message);
        }
    }
}

module.exports = productService;