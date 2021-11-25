const router = require('express').Router();
const { validateMovie, validateMovieId } = require('../middlewares/validation');

const {
  createMovie,
  deleteMovieById,
  getMovies,
} = require('../controllers/movies');

router.get('/', getMovies);
router.post('/', validateMovie, createMovie);
router.delete('/:id', validateMovieId, deleteMovieById);

module.exports = router;
