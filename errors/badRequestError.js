const { ERROR_CODE } = require('./status');

class BadRequest extends Error {
  constructor(message) {
    super(message);
    this.status = ERROR_CODE;
  }
}

module.exports = BadRequest;
