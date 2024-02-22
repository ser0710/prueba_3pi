const Role = require("../entities/roles")
const emptyError = require("../errors/emptyError")
const User = require("../entities/users");

class usersService{
    constructor(usersRepository){
        this.usersRepository = usersRepository;

    }

    async createRole(role){

        if(role.name === ""){
            throw new emptyError('El rol debe tener un nombre valido', 500) 
        }
        if(role.name){
            if(role.name.trim().length === 0){
                throw new emptyError('El rol debe tener un nombre valido', 500)
            }
        }
        const newRole = new Role(null, role.name);
        try {
            await this.usersRepository.createRole(newRole);
        }catch(error){
            throw new Error('el nombre del rol no puede ser nulo');
        }
    }

    async createUser(user){
        var errors = [];
        for (var prop in user) {
            if(user[prop] === ""){
                errors.push(prop);
            }
            if(user[prop]){
                if(user[prop].trim().length === 0){
                    errors.push(prop);
                } 
            }
        }
        if(errors.length > 0){
            throw new emptyError(`El ${errors} del usuario no puede ser vacio`, 500)
        }
        const newUser = new User(user.document, null, user.last_name, user.name, null);
        try{
            await this.usersRepository.createUser(newUser);
        }catch(error){
            throw new Error(error.message);
        }
    }

    async listUsers(){
        try{
            var listUsers = await this.usersRepository.listUsers();
            return listUsers.map(data => new User(data.document, data.id, data.last_name, data.name_u, data.role_name))
        } catch(error){
            throw new Error('error' + error.message);
        }
    }

    async deleteUser(user){
        try{
            await this.usersRepository.deleteUser(user);
        }catch(error){
            throw new Error(error.message);
        }
    }
}

module.exports = usersService;