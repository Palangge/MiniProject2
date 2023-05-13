const express = require('express');

const usersController = require('../controllers/users.controller');

const userRouter = express.Router();

userRouter.post('/signup', usersController.addUser);
userRouter.get('/getUsers', usersController.getAllUsers);
userRouter.put('/change-password',usersController.changePassword); 
userRouter.post('/login',usersController.login); 
userRouter.post('/logout',usersController.logout); 
userRouter.get('/me',usersController.me); 

module.exports = userRouter;