const { Joi, celebrate, CelebrateError } = require('celebrate');
const { isURL } = require('validator');

const validateUrl = Joi.string().required().custom((v) => {
  if (!isURL(v, { require_protocol: true })) {
    throw new CelebrateError('неправильный формат ссылки');
  }
  return v;
});

const validateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: validateUrl,
    trailer: validateUrl,
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    thumbnail: validateUrl,
    movieId: Joi.number().required(),
  }),
});

const validateMovieId = celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24),
  }),
});

const validateUserId = celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24),
  }),
});

const validateUpdateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});

const validateSignUp = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().required().min(2).max(30),
  }),
});

const validateSignIn = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

module.exports = {
  validateMovie,
  validateMovieId,
  validateUserId,
  validateUpdateUser,
  validateSignUp,
  validateSignIn,
};
