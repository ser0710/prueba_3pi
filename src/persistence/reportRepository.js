const { Pool } = require('pg');

class reportRepository{
    constructor(){
        this.pool = new Pool({
            user: 'ser',
            host: 'localhost',
            database: 'prueba',
            password: '3pimedios',
            port: '5433',
        });
    }

    async dailyReport(day){
        try{
            const connection = await this.pool.connect();
            const query = 'SELECT total FROM sales WHERE sales_at::date = $1';
            const result = await connection.query(query, [day]);
            return result.rows;
        } catch(error){
            throw new Error('error' + error.message);
        }
        
    }

    async monthlyReport(initDate, finDate){
        try{
            const connection = await this.pool.connect();
            const query = 'SELECT total FROM sales WHERE sales_at >= $1 AND sales_at <= $2';
            const result = await connection.query(query, [initDate, finDate]);
            return result.rows;
        } catch(error){
            throw new Error('error' + error.message);
        }

    }
}

module.exports = reportRepository;