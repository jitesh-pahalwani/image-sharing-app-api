const CustomError = require('./custom-error');

class UploadError extends CustomError {
  statusCode = 500;

  constructor(message) {
    super(message);
  }

  serializeErrors(){
    return [{message: `Error while uploading: ${this.message}`}]
  };
}

module.exports = UploadError;