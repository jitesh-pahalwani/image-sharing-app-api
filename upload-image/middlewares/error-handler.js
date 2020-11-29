const CustomError = require('../errors/custom-error');

// An error handling middleware.
const errorHandler = (error, req, res, next) => {

    if (error instanceof CustomError) {
        return res.status(error.statusCode).send({ errors: error.serializeErrors() });
      }
    
      res.status(400).send({
        errors: [{ message: error.message }]
      });
};

module.exports = errorHandler;