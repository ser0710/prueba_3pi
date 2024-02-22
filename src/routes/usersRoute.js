const express = require("express");
const UsersController = require("../controllers/usersController");
const UsersService = require('../services/usersServices');
const UsersRepository = require('../persistence/usersRepository');


const router = express.Router();
const usersRepository = new UsersRepository();
const usersService = new UsersService(usersRepository);
const usersController = new UsersController(usersService);

router.post('/api/v1/roles', usersController.createRole.bind(usersController));
router.post('/api/v1/users', usersController.createUser.bind(usersController));
router.get('/api/v1/users', usersController.listUsers.bind(usersController));

module.exports = router;