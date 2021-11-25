const { messages } = require('../middlewares/errors');

class ConflictError extends Error {
  constructor(message = messages.conflict) {
    super(message);
    this.statusCode = 409;
  }
}

module.exports = { ConflictError };
