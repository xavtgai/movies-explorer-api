/* eslint-disable no-useless-escape */
const bcrypt = require('bcryptjs');

const mongoose = require('mongoose');

const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Неправильный формат почтового адреса');
      }
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },
  //  кладем каждому пользователю список лайкнутых им фильмов
  likedFilms: [{
    type: Number,
    required: true,
    ref: 'movieId',
    default: [],
  }],
});

const rejectIncorrectData = () => Promise.reject(new Error('Неправильные почта или пароль'));

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, pass) {
  return this.findOne({ email }).select('+password')
    .then(({ password, ...user }) => {
      if (!user) {
        return rejectIncorrectData;
      }

      return bcrypt.compare(pass, password)
        .then((matched) => {
          if (!matched) {
            return rejectIncorrectData;
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
