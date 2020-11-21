class CustomError extends Error {
  constructor(message) {
    console.log('CustomError constructor ', message);
    super(message);
    this.statusCode;
  }

  serializeErrors(){
    return [{message: 'Something went wrong.'}]
  };
}

module.exports = CustomError;