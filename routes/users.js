const userRouter = require('express').Router();
const {
  getUsers, getUser, createUser, updateUser, updateAvatar,
} = require('../controllers/users');

userRouter.get('/user', getUsers);

userRouter.get('/users/:userId', getUser);

userRouter.post('/users', createUser);

userRouter.patch('/users/me', updateUser);

userRouter.patch('users/me/avatar', updateAvatar);

module.exports = userRouter;