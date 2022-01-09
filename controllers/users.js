const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { NODE_ENV, JWT_SECRET } = process.env;

const {
  statusCodes,
  messages,
} = require('../middlewares/errors');

const { BadRequestError } = require('../errors/badrequest-err');
const { NotFoundError } = require('../errors/notfound-err');
const { UnauthorizedError } = require('../errors/unauthorized-err');
const { ConflictError } = require('../errors/conflict-err');

module.exports.getMyData = (req, res, next) => {
  User.findById(req.user._id)
    .then((data) => {
      if (!data) { throw new NotFoundError(messages.notFound); }
      return res.send({ data });
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    name, password, email,
  } = req.body;
  bcrypt.hash(password, 12)
    .then((hash) => User.create({
      name, email, password: hash, likedFilms: [],
    }))
  // eslint-disable-next-line no-shadow
    .then((user) => res.send({
      data: {
        name: user.name,
        email: user.email,
        likedFilms: user.likedFilms,
        _id: user._id,
      },
    }))
    .catch((err) => {
      if (err.name === 'MongoServerError' && err.code === statusCodes.mongo) { throw new ConflictError(); }
      if (err.name === 'ValidationError') {
        throw new BadRequestError();
      }
      next(err);
    })
    .catch(next);
};

module.exports.updateUser = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, email }, { new: true, runValidators: true })
    .then((data) => {
      if (!data) {
        throw new NotFoundError();
      }
      return res.send({ data });
    })
    .catch((err) => {
      if (err.name === 'MongoServerError' && err.code === statusCodes.mongo) {
        throw new ConflictError();
      }
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        throw new BadRequestError();
      }

      next(err);
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      // создадим токен

      const token = jwt.sign({ _id: user._doc._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });

      res
        .cookie('jwt', token, {
          httpOnly: true,
          sameSite: true,
        })
        .send({ message: 'вход успешно выполнен' });
    })
    .catch(() => {
      throw new UnauthorizedError('Неправильная почта или пароль');
    })
    .catch(next);
};

module.exports.logout = (_req, res) => {
  res.clearCookie('jwt', {
    secure: true,
    sameSite: 'none',
  }).send({ message: 'Выход осуществлен' });
};

module.exports.likeCard = (req, res, next) => User.findByIdAndUpdate(
  req.user._id,
  { $addToSet: { likedFilms: req.params.id } },
  { new: true },
)
  .then((card) => {
    if (!card) {
      throw new NotFoundError();
    }
    return res.send(card);
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      //  tmp
      console.log(err);
      throw new BadRequestError();
    }
    next(err);
  })
  .catch(next);

module.exports.dislikeCard = (req, res, next) => User.findByIdAndUpdate(
  req.user._id,
  { $pull: { likedFilms: req.params.id } }, // убрать id из массива
  { new: true },
)
  .then((card) => {
    if (!card) {
      throw new NotFoundError();
    }
    return res.send(card);
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      throw new BadRequestError();
    }
    next(err);
  })
  .catch(next);
