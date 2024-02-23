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
            connection.release();
        }catch(error){
            throw new notFoundError(error.message.includes("users") ? "usuario no encontrado" : "producto no encontrado", 404);
        }

    }

    async listSales(){
        try{
            const connection = await this.pool.connect();
            const query = `SELECT 
                            p.name_p AS products_id,
                            v.sales_at AS date,
                            v.qty AS qty,
                            v.id AS id,
                            v.total AS total,
                            u.name_u AS users_id
                        FROM 
                            sales v
                        JOIN 
                            products p ON v.products_id = p.id
                        JOIN 
                            users u ON v.users_id = u.id;`;
            const listS = await connection.query(query);
            connection.release();
            return listS.rows;
        }catch(error){
            throw new Error('error' + error.message);
        }
    }

    async deleteSale(saleId){
        try {
            const connection = await this.pool.connect();
            const query = 
            `DELETE FROM sales
            WHERE id = '${saleId}'
            RETURNING *`;
            const result = await connection.query(query);
            connection.release();
            if(result.rowCount === 0){
                throw new Error();
            }
        }catch(error){
            throw new notFoundError("Venta no encontrada", 404);
        }
    }

}

module.exports = salesRepository;