const { CONFLICT_ERROR } = require('./status');

class ConflictedError extends Error {
  constructor(message) {
    super(message);
    this.status = CONFLICT_ERROR;
  }
}

module.exports = ConflictedError;
