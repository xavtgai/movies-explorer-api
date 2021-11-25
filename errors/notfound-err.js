const { messages } = require('../middlewares/errors');

class NotFoundError extends Error {
  constructor(message = messages.notFound) {
    super(message);
    this.statusCode = 404;
  }
}

module.exports = { NotFoundError };
