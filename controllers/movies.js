const Movie = require('../models/movie');

const { messages } = require('../middlewares/errors');
const { BadRequestError } = require('../errors/badrequest-err');
const { NotFoundError } = require('../errors/notfound-err');
const { ForbiddenError } = require('../errors/forbidden-err');

module.exports.createMovie = (req, res, next) => {
  const {
    country, director, duration, year, description, image, trailer, nameRU, nameEN,
    thumbnail, movieId,
  } = req.body;
  Movie.create({
    owner: req.user._id,
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  })
    .then((data) => res.send({ data }.data))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError(messages.badRequest);
      }
      next(err);
    })
    .catch(next);
};

module.exports.deleteMovieById = (req, res, next) => {
  const userId = req.user._id;

  Movie.findById(req.params.id)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError();
      }
      if (movie.owner.toString() !== userId) {
        next(new ForbiddenError());
        return;
      }
      movie.deleteOne()
        .then(() => res.send({ data: movie }))
        .catch(next);
    })
    .then((movie) => {
      res.send({ message: `Карточка фильма "${movie.name}" удалена` });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequestError();
      } else {
        next(err);
      }
    })
    .catch(next);
};

module.exports.getMovies = (req, res, next) => Movie.find({})
  .then((data) => res.send({ data }.data))
  .catch(next);
