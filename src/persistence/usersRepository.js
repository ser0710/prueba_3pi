const { Pool } = require('pg');

class usersRepository{
    constructor(){
        this.pool = new Pool({
            user: 'ser',
            host: 'localhost',
            database: 'prueba',
            password: '3pimedios',
            port: '5433',
        });
    }

    async createRole(role){
        try{
            const connection = await this.pool.connect();
            const query = 'INSERT INTO roles VALUES ($1, $2)';
            const values = [role.id, role.name];
            await connection.query(query, values);
            connection.release();
        } catch(error){
            throw new Error('error' + error.message);
        }
    }

}



module.exports = usersRepository;