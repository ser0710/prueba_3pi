const { Pool } = require('pg');

class productRepository{
    constructor(){
        this.pool = new Pool({
            user: 'ser',
            host: 'localhost',
            database: 'prueba',
            password: '3pimedios',
            port: '5433',
        });
    }

    async createProduct(product){
        try{
            const connection = await this.pool.connect();
            const query = 'INSERT INTO products VALUES ($1, $2, $3, $4)';
            const values = [product.id, product.des, product.name, product.price];
            await connection.query(query, values);
            connection.release();
        } catch(error){
            throw new Error('error' + error.message);
        }
    }
    
    async listProducts(){
        try{
            const connection = await this.pool.connect();
            const query = 'SELECT * FROM products';
            const listP = await connection.query(query);
            connection.release();
            return listP.rows;
        }catch(error){
            throw new Error('error' + error.message);
        }
    }
}



module.exports = productRepository;