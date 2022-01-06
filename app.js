const express = require('express');
require('dotenv').config();
// Слушаем 3001 порт
const { PORT = 3001 } = process.env;
const { errors } = require('celebrate');

console.log(process.env.NODE_ENV);
const app = express();

const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const rateLimiter = require('./middlewares/ratelimit');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { statusCodes, messages } = require('./middlewares/errors');

app.use(rateLimiter);

const options = {
  origin: [
    'http://localhost:3001',
    'http://localhost:3000',
    'https://almostkinopoisk.nomoredomains.rocks',
    'https://api.almostkinopoisk.nomoredomains.rocks',
    'http://almostkinopoisk.nomoredomains.rocks',
    'http://api.almostkinopoisk.nomoredomains.rocks',
  ],
  // methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  // preflightContinue: false,
  // optionsSuccessStatus: 204,
  // allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
  credentials: true,
};
//  app.options('*', cors(options));
app.use('*', cors(options));

app.use(express.json());
app.use(cookieParser());

app.use(requestLogger);

app.use('/', require('./routes'));

app.use(errorLogger);

mongoose.connect('mongodb://localhost:27017/moviesdb', {

  useNewUrlParser: true,
  // , useCreateIndex: true,
  //  useFindAndModify: false,
});

app.use(
  errors(),
  (err, req, res, next) => {
    const {
      statusCode = statusCodes.server,
      message = messages.server,
    } = err;

    res.status(statusCode).send({ message });
    next();
  },
);

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
