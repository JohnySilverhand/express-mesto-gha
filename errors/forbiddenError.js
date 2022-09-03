const { FORBIDDEN_ERROR } = require('./status');

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.status = FORBIDDEN_ERROR;
  }
}

module.exports = ForbiddenError;
