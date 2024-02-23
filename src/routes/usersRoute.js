const express = require("express");
const UsersController = require("../controllers/usersController");
const UsersService = require('../services/usersServices');
const UsersRepository = require('../persistence/usersRepository');
const SecurityRepository = require('../persistence/securityRepository');

const securityRepository = new SecurityRepository();

async function verify(req, res, next){
    const userId = req.headers['auth'];
    if(!userId){
        return res.status(403).json({ message: 'ID no proporcionado' });
    }
    try{
        const validation = await securityRepository.verify(userId);
        if(validation.rows.length === 0){
            return res.status(403).json({ message: 'ID no válido' });
        }
        req.userID = userId;
        req.userRole = validation.rows[0].role;
        next();
    } catch(error){
        res.status(500).json({ message: error.message });
    }
}

const router = express.Router();
const usersRepository = new UsersRepository();
const usersService = new UsersService(usersRepository);
const usersController = new UsersController(usersService);

router.post('/api/v1/roles', verify, usersController.createRole.bind(usersController));
router.post('/api/v1/users', verify, usersController.createUser.bind(usersController));
router.get('/api/v1/users', verify, usersController.listUsers.bind(usersController));
router.delete('/api/v1/users/:userId', verify, usersController.deleteUser.bind(usersController));
router.put('/api/v1/users/:userId/:roleId', verify, usersController.addUserRole.bind(usersController));

module.exports = router;