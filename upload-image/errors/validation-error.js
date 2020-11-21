const CustomError = require('./custom-error');

class ValidationError extends CustomError {
  constructor(errors) {
    console.log('ValidationError constructor ', errors);
    super(errors);
    this.statusCode = 400;
    this.errors = errors;
  }

  serializeErrors(){
    console.log('hello ', this.errors);
    return this.errors.map((err) => {
      return { message: err.msg, field: err.param };
    })
  };
}

module.exports = ValidationError;