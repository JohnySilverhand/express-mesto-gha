const { UNAUTHORIZED_ERROR } = require('./status');

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.status = UNAUTHORIZED_ERROR;
  }
}

module.exports = UnauthorizedError;
