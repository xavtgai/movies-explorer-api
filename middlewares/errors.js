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
  badUrl: 'Некорректный формат ссылки',
  rpsOverlimit: 'Вы превысили лимит на число запросов (1 запрос в секунду)',
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
