const AWS = require('aws-sdk');

// Configuring for connecting to the AWS S3 bucket.
const s3Instance = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

module.exports = s3Instance;