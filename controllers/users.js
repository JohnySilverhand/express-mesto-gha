const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFound = require('../errors/error');
const {
  ERROR_CODE, NOT_FOUND, SERVER_ERROR, SUCCESS,
} = require('../errors/status');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((user) => res.send({ user }))
    .catch(() => {
      res.status(SERVER_ERROR).send({ message: 'Произошла ошибка' });
    });
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.userId)
    .orFail(() => {
      throw new NotFound();
    })
    .then((user) => {
      res.send({ user });
    })
    .catch((err) => {
      if (err.name === 'NotFound') {
        res.status(NOT_FOUND).send({ message: 'Пользователь по указанному _id не найден.' });
      } else if (err.name === 'CastError') {
        res.status(ERROR_CODE).send({ message: 'Некорректный _id для получения данных пользователя.' });
      } else {
        res.status(SERVER_ERROR).sned({ message: 'Произошла ошибка' });
      }
    });
};

module.exports.createUser = (req, res) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      email: req.body.email,
      password: hash,
      name: req.body.name,
      about: req.body.about,
      avatar: req.body.avatar,
    }))
    .then((user) => {
      const userInfo = {
        email: user.email,
        name: user.name,
        about: user.about,
        avatar: user.avatar,
      };
      res.status(SUCCESS).send(userInfo);
    })
    .catch(() => {

    });
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(() => {
      throw new NotFound();
    })
    .then((user) => res.send({ user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_CODE).send({ message: 'Переданы некорректные данные при обновлении данных пользователя.' });
      } else if (err.name === 'NotFound') {
        res.status(NOT_FOUND).send({ message: 'Пользователь по указанному _id не найден.' });
      } else {
        res.status(SERVER_ERROR).send({ message: 'Произошла ошибка' });
      }
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(() => {
      throw new NotFound();
    })
    .then((user) => res.send({ user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_CODE).send({ message: 'Переданы некорректные данные при обновлении аватара.' });
      } else if (err.name === 'NotFound') {
        res.status(NOT_FOUND).send({ message: 'Пользователь по указанному _id не найден.' });
      } else {
        res.status(SERVER_ERROR).send({ message: 'Произошла ошибка' });
      }
    });
};

module.exports.login = (req, res, next) => {
  const {email, password} = req.body;
  return User.findUserByCrendentails(email, password)
    .then((user) => {
      const token = jwt.sign({_id: user._id}, 'secret-key', {expiresIn: '2d'});
      return res.send({token});
    })
    .catch(next);
};
