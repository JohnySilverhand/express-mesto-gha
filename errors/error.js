const { NOT_FOUND } = require('./status');

class NotFound extends Error {
  constructor(message) {
    super(message);
    this.status = NOT_FOUND;
  }
}

module.exports = NotFound;
