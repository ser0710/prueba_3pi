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

    async createUser(user){
        try{
            const connection = await this.pool.connect();
            const query = 'INSERT INTO users VALUES ($1, $2, $3, $4)';
            const values = [user.document, user.id, user.last_name, user.name];
            await connection.query(query, values);
            connection.release();
        } catch(error){
            throw new Error('error' + error.message);
        }
    }

    async listUsers(){
        try{
            const connection = await this.pool.connect();
            const query = `
            SELECT u.*, r.name_r AS role_name 
            FROM users u 
            LEFT JOIN roles r ON u.roles_id = r.id
          `;
            const listU = await connection.query(query);
            connection.release();
            console.log(listU.rows)
            return listU.rows;
        } catch(error){
            throw new Error('error' + error.message);
        }
    }

}



module.exports = usersRepository;