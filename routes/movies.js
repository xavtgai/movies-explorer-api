const router = require('express').Router();
const { validateMovie } = require('../middlewares/validation');

const {
  createMovie,
  deleteMovieById,
  getMovies,
} = require('../controllers/movies');

router.get('/', getMovies);
router.post('/', validateMovie, createMovie);
//  поскольку мы пока не знаем в каком формате будет приходить movieID c внешнего API,
//  то валидация айди пока не производится
router.delete('/:id', deleteMovieById);

module.exports = router;
