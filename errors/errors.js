const NotFoundError = { status: 404, message: 'Объект не найден' };
const ValidationError = { status: 400, message: 'Переданы некорректные данные' };
const CastError = { status: 400, message: 'Передан некорректный id' };
const GeneralError = { status: 500, message: 'Ошибка на стороне сервера' };

module.exports = {
  NotFoundError, ValidationError, GeneralError, CastError,
};
