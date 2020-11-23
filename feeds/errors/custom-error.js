// A custom error class.
class CustomError extends Error {
  constructor(message) {
    super(message);
    this.statusCode;
  }

  serializeErrors(){
    return [{message: 'Something went wrong.'}]
  };
}

module.exports = CustomError;