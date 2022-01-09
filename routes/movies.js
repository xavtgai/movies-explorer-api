const router = require('express').Router();
const { validateMovie, validateMovieId } = require('../middlewares/validation');

const {
  createMovie,
  // deleteMovieById,
  getMovies,
} = require('../controllers/movies');

const {
  likeCard,
  dislikeCard,
} = require('../controllers/users');

router.get('/', getMovies);
router.post('/', validateMovie, createMovie);

// router.delete('/:id', validateMovieId, deleteMovieById);

router.put('/:id/likes', validateMovieId, likeCard);
router.delete('/:id/likes', validateMovieId, dislikeCard);

module.exports = router;
