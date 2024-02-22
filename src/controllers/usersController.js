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

}

module.exports = usersController;