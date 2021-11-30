const mongoose = require('mongoose');

const validator = require('validator');

const { messages } = require('../middlewares/errors');

const movieSchema = new mongoose.Schema({
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (image) => {
        validator.isURL(image, { protocols: ['http', 'https'], require_protocol: true });
      },
      message: messages.badUrl,
    },
  },
  trailer: {
    type: String,
    required: true,
    validate: {
      validator: (trailer) => {
        validator.isURL(trailer, { protocols: ['http', 'https'], require_protocol: true });
      },
      message: messages.badUrl,
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (thumbnail) => {
        validator.isURL(thumbnail, { protocols: ['http', 'https'], require_protocol: true });
      },
      message: messages.badUrl,
    },
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('movie', movieSchema);
