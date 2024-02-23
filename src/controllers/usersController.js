class usersController {
    constructor(usersService){
        this.usersService = usersService;
    }

    async createRole(req, res){
        
        try{
            const role = req.body;
            await this.usersService.createRole(role);
            res.status(201).json({ message: 'Rol creado' });
        }catch(error){
            res.status(500).json({ error: error.message });
        }
    }

    async createUser(req, res){
        try{
            const user = req.body;
            await this.usersService.createUser(user);
            res.status(201).json({ message: 'Usuario creado' });
        } catch(error){
            res.status(500).json({ error: error.message });
        }
    }

    async listUsers(req, res){
        try{
            const result = await this.usersService.listUsers();
            res.status(200).json(result);
        }catch(error){
            res.status(500).json({ error: error.message });
        }
    }

    async deleteUser(req, res){
        try{
            const userId = req.params.userId;
            await this.usersService.deleteUser(userId);
            res.status(200).json({ message: 'Usuario eliminado' });
        } catch(error){
            res.status(error.status).json({ error: error.message });
        }
    }

    async addUserRole(req, res){
        try{
            const userId = req.params.userId;
            const roleId = req.params.roleId;
            await this.usersService.addUserRole(userId, roleId);
            res.status(200).json({ message: 'Rol asignado' });
        }catch(error){
            res.status(404).json({ error: error.message });
        }
    }

}

module.exports = usersController;