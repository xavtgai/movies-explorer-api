const router = require('express').Router();
const { validateUpdateUser } = require('../middlewares/validation');

const {
  updateUser,
  getMyData,
} = require('../controllers/users');

router.get('/me', getMyData);
router.patch('/me', validateUpdateUser, updateUser);

module.exports = router;
