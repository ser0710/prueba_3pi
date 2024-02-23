const { Pool } = require('pg');

class securityRepository{
    constructor(){
        this.pool = new Pool({
            user: 'ser',
            host: 'localhost',
            database: 'prueba',
            password: '3pimedios',
            port: '5433',
        });
    }

    async verify(userId){
        try{
            const connection = await this.pool.connect();
            const query = `SELECT r.name_r AS nombre_rol
                            FROM users u
                            JOIN roles r ON u.roles_id = r.id
                            WHERE u.id = '${userId}'
                            AND r.name_r = 'admin';`
            const result = await connection.query(query)
            connection.release();
            return result;
            
        }catch(error){
            throw new Error(error.message);
        }

    }

}

module.exports = securityRepository;