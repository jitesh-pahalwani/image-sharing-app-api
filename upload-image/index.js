require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { body, validationResult } = require('express-validator');

const errorHandler = require('./middlewares/error-handler.js');
const ValidationError = require('./errors/validation-error');
const UploadError = require('./errors/upload-error');
const DatabaseError = require('./errors/database-error');
const savePostToDB = require('./db-connection/db.utils');
const uploadFileToS3 = require('./s3-connection/s3.utils');

const app = express();
app.use(express.json());
app.use(cors());

// upload-image POST API
app.post('/upload-image', [
  body('username')
  .not()
  .isEmpty()
  .withMessage('username should not be empty'),
  body('post_description')
  .not()
  .isEmpty()
  .withMessage('Post description should not be empty'),
  body('fileContent')
  .not()
  .isEmpty()
  .withMessage('fileContent should not be empty')
] ,async (req, res, next) => {
  // Get results from the validations done on the request body.
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // If there are any validation errors, create an instance of the validation error class.
    next(new ValidationError(errors.array()));
    return;
  }

  try {
    // Calling the method to upload the file to AWS S3 bucket.
    const uploadResult = await uploadFileToS3(req.body);

    try {
      // On successful upload to S3 bucket, save the new post url and other related details to DB.
      const dbResult = await savePostToDB(uploadResult, req.body);
    } catch(error) {
      // Catch the error encountered while saving the post details to DB.
      next(new DatabaseError(error));
      return;
    }

  } catch(err) {
    // Catch the error encountered while uploading the file to AWS S3 bucket.
    next(new UploadError(err));
    return;
  }

  res.status(200).send({message: 'Post uploaded successfully.'});
});

app.use(errorHandler);

app.listen(process.env.PORT_NUMBER, () => {
  console.log(`Listening on ${process.env.PORT_NUMBER}`);
});