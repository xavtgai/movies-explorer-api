const express = require('express');
require('dotenv').config();
// Слушаем 3000 порт
const { PORT = 3000 } = process.env;
const { errors } = require('celebrate');

console.log(process.env.NODE_ENV);
const app = express();

const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const auth = require('./middlewares/auth');
const { statusCodes, messages } = require('./middlewares/errors');

const { NotFoundError } = require('./errors/notfound-err');

const { login, createUser, logout } = require('./controllers/users');
const { validateSignIn, validateSignUp } = require('./middlewares/validation');

const options = {
  origin: [
    'http://localhost:3000',
    'http://localhost:3006',
    'https://russiantravel.nomoredomains.rocks',
    'https://api.russiantravel.nomoredomains.rocks',
    'http://russiantravel.nomoredomains.rocks',
    'http://api.russiantravel.nomoredomains.rocks',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
  credentials: true,
};
app.use('*', cors(options));

app.use(express.json());
app.use(cookieParser());

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', validateSignIn, login);
app.post('/signup', validateSignUp, createUser);
app.post('/signout', logout);

app.use('/movies', auth, require('./routes/movies'));
app.use('/users', auth, require('./routes/users'));

app.use('*', auth, () => { throw new NotFoundError('Объект не найден'); });

app.use(errorLogger);

mongoose.connect('mongodb://localhost:27017/kinodb', {

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
