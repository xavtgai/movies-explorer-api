const router = require('express').Router();
const { validateSignIn, validateSignUp } = require('../middlewares/validation');

const { login, createUser, logout } = require('../controllers/users');

router.post('/signin', validateSignIn, login);
router.post('/signup', validateSignUp, createUser);
router.post('/signout', logout);

module.exports = router;
