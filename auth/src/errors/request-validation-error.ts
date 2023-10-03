import { ValidationError } from 'express-validator';

export class RequestValidationError extends Error {
  statusCode = 500;
  constructor(public errors: ValidationError[]) {
    super();

    // ONly because we are extending a build in class
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    return this.errors.map((err) => {
      if (err.type === 'field') {
        return { message: err.msg, field: err.path };
      }
      return { message: err.msg };
    });
  }
}
