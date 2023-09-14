const express = require('express');
// const UserController = require('../controller/UserController');
const SignUpController = require('../controller/SignUpController');
const LoginController = require('../controller/LoginController');
const authenticateToken = require('../middleware/authentication')
const UserController = require('../controller/UserController');
const router = express.Router();

// router.get('/users', UserController.getUser);

router.post('/login', LoginController.Login);
router.post('/signup', SignUpController.SignUpUser);
router.get('/', UserController.getUsers);
router.get('/assignedUsers', UserController.getAssignedUsers)
router.get('/userByProjectId',authenticateToken ,UserController.getUsersByProjectId)

module.exports = router;
