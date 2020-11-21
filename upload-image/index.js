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
  console.log(req.body);
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    next(new ValidationError(errors.array()));
    return;
  }

  try {
    const uploadResult = await uploadFileToS3(req.body);
    try {
      const dbResult = await savePostToDB(uploadResult, req.body);
      console.log('success!!!');
    } catch(error) {
      console.log('error in db updating ', error);
      next(new DatabaseError(error));
      return;
    }
  } catch(err) {
    console.log('error while uploading file ', err);
    next(new UploadError(err));
    return;
  }

  res.status(200).send({message: 'Post uploaded successfully.'});
});

app.use(errorHandler);

app.listen(process.env.PORT_NUMBER, () => {
  console.log(`Listening on ${process.env.PORT_NUMBER}`);
});