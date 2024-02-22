const Role = require("../entities/roles")
const emptyError = require("../errors/emptyError")


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
}

module.exports = usersService;