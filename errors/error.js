class SomeError extends Error {
  constructor() {
    super();
    this.name = this.constructor.name;
  }
}

module.exports = SomeError;
