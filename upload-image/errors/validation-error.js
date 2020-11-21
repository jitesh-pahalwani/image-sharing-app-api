const CustomError = require('./custom-error');

// A class for request validation errors.
class ValidationError extends CustomError {
  constructor(errors) {
    super(errors);
    this.statusCode = 400;
    this.errors = errors;
  }

  serializeErrors(){
    return this.errors.map((err) => {
      return { message: err.msg, field: err.param };
    })
  };
}

module.exports = ValidationError;