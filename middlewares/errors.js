const statusCodes = {
  created: 201,
  badRequest: 400,
  unauthorized: 401,
  forbidden: 403,
  notFound: 404,
  conflict: 409,
  server: 500,
  mongo: 11000,
};
const messages = {
  ok: 'Успешно',
  badRequest: 'Переданы не вполне корректные данные',
  unauthorized: 'Требуется авторизация',
  forbidden: 'Недостаточно прав',
  notFound: 'Объект или страница не найдены',
  conflict: 'В базе уже есть такая запись',
  server: 'Ошибка на стороне сервера',
};

class ServerError extends Error {
  constructor(message = messages.internal) {
    super(message);
    this.statusCode = 500;
  }
}

module.exports = {
  statusCodes,
  messages,
  ServerError,
};
