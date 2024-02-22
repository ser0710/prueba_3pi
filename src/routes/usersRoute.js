const express = require("express");
const UsersController = require("../controllers/usersController");
const UsersService = require('../services/usersServices');
const UsersRepository = require('../persistence/usersRepository');


const router = express.Router();
const usersRepository = new UsersRepository();
const usersService = new UsersService(usersRepository);
const usersController = new UsersController(usersService);

router.post('/api/v1/roles', usersController.createRole.bind(usersController));


module.exports = router;