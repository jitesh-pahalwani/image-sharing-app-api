const CustomError = require('../errors/custom-error');

const errorHandler = (error, req, res, next) => {
    console.log('error in middleware ', error);

    if (error instanceof CustomError) {
        return res.status(error.statusCode).send({ errors: error.serializeErrors() });
      }
    
      res.status(400).send({
        errors: [{ message: 'Something went wrong' }]
      });
};

module.exports = errorHandler;