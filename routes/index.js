const router = require('express').Router();
const auth = require('../middlewares/auth');

const { NotFoundError } = require('../errors/notfound-err');

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

router.use(require('./security'));
router.use('/movies', auth, require('./movies'));
router.use('/users', auth, require('./users'));

router.use('*', auth, () => { throw new NotFoundError('Объект не найден'); });

module.exports = router;
