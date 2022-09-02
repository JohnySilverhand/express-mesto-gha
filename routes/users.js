const userRouter = require('express').Router();
const {
  getUsers, getUser, updateUser, updateAvatar, getUserInfo,
} = require('../controllers/users');

userRouter.get('/users', getUsers);

userRouter.get('/me', getUserInfo);

userRouter.get('/users/:userId', getUser);

userRouter.patch('/users/me', updateUser);

userRouter.patch('/users/me/avatar', updateAvatar);

module.exports = userRouter;
