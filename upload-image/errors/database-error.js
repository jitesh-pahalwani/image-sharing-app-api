const CustomError = require('./custom-error');

class DatabaseError extends CustomError {
  constructor(message) {
    super(message);
    this.statusCode = 500;
  }

  serializeErrors(){
    return [{message: `Error while updating database: ${this.message}`}]
  };
}

module.exports = DatabaseError;