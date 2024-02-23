const { Pool } = require('pg');
const notFoundError = require("../errors/notFound");

class salesRepository{
    constructor(){
        this.pool = new Pool({
            user: 'ser',
            host: 'localhost',
            database: 'prueba',
            password: '3pimedios',
            port: '5433',
        });
    }

    async createSale(sale){
        try{
            const connection = await this.pool.connect();
            const queryP = `SELECT price FROM products WHERE id = '${sale.prod_id}'`
            const resultP = await connection.query(queryP);
            const finalP = resultP.rows[0].price * sale.qty;
            const queryS = 'INSERT INTO sales VALUES ($1, $2, $3, $4, $5, $6)';
            const values = [sale.id, sale.prod_id, sale.qty, sale.date, sale.user_id, finalP];
            await connection.query(queryS, values);
        }catch(error){
            throw new notFoundError(error.message.includes("users") ? "usuario no encontrado" : "producto no encontrado", 404);
        }

    }

}

module.exports = salesRepository;