const { messages } = require('../middlewares/errors');

class UnauthorizedError extends Error {
  constructor(message = messages.unauthorized) {
    super(message);
    this.statusCode = 401;
  }
}

module.exports = { UnauthorizedError };
