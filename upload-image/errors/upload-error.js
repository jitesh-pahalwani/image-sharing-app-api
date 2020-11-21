const CustomError = require('./custom-error');

// A class for errors related to uploading to AWS S3 bucket.
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