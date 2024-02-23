const { Pool } = require('pg');
const notFoundError = require("../errors/notFound")

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
            return listU.rows;
        } catch(error){
            throw new Error('error' + error.message);
        }
    }

    async deleteUser(user){
        try{
            const connection = await this.pool.connect();
            const query = 
            `DELETE FROM users
            WHERE id = '${user}'
            RETURNING *
            `;
            const result = await connection.query(query);
            if (result.rowCount === 0){
                throw new notFoundError('Usuario no encontrado', 404);
            }
        }catch(error){
            throw new notFoundError('Usuario no encontrado', 404);
        }
    }

    async addUserRole(userId, roleId){
        console.log(userId)
        var errors = [];
        try{
            const connection = await this.pool.connect();
            const userQuery = 'SELECT * FROM users WHERE id = $1';
            const resultU = await connection.query(userQuery, [userId]);
            const user = resultU.rows[0];
            if(!user){
                console.log("entro primer if")
                errors.push("usuario");
            }

            const roleQuery = 'SELECT * FROM roles WHERE id = $1';
            const resultR = await connection.query(roleQuery, [roleId]);
            const role = resultR.rows[0];
            if(!role){
                errors.push("rol");
            }
            if(errors.length > 0){
                throw new notFoundError(errors + "no encontrado")
            }

            const Fquery = 'UPDATE users SET roles_id = $1 WHERE id = $2';
            await connection.query(Fquery, [roleId, userId])
            

        }catch(error){
            console.log(errors)
            throw new notFoundError(`${errors} no encontrado`);
        }
    }

}



module.exports = usersRepository;