export class APIError extends Error {
  constructor(http, message) {
    super(message)
    const { statusCode, code } = http
    this.code = code
    this.statusCode = statusCode

    // Since we are extending built in error class
    Object.setPrototypeOf(this, APIError.prototype)
  }
}
