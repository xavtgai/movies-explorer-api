const jwt = require('jsonwebtoken');

const { UnauthorizedError } = require('../errors/unauthorized-err');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  let payload;

  try {
    payload = NODE_ENV === 'production' ? jwt.verify(token, JWT_SECRET) : jwt.verify(token, 'dev-secret');
  } catch (err) {
    next(new UnauthorizedError());
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  next(); // пропускаем запрос дальше
};
