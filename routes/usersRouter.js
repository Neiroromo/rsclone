const express = require('express');
const usersController = require('../controllers/usersController');
const authController = require('../controllers/authController');

const usersRouter = express.Router();

usersRouter.post('/signup', authController.signup);
usersRouter.post('/login', authController.login);
// userRouter.post('/forgotPassword', authController.forgotPassword);
// userRouter.post('/resetPassword', authController.resetPassword);
usersRouter.post('/deleteMe', authController.protect, usersController.deleteMe);
usersRouter.post('/updateMe', authController.protect, usersController.updateMe);
usersRouter
  .route('/')
  .get(usersController.getAllUsers)
  .post(usersController.createUser);
usersRouter
  .route('/:id')
  .get(usersController.getUser)
  .patch(usersController.updateUser)
  .delete(usersController.deleteUser);

module.exports = usersRouter;
