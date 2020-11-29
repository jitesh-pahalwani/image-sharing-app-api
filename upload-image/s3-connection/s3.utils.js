const s3Instance = require('./s3-instance');

// Method to upload a post to the AWS S3 bucket.
const uploadFileToS3 = (dataObject) => {
  const { username, fileContent, FileContentType, fileName } = dataObject;
  const destFileName = username + new Date().getTime() + fileName;
  
  // Setting up S3 upload parameters
  const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: destFileName, // File name you want to save as in S3
      Body: fileContent,
      ContentType:  FileContentType,
      ACL: 'public-read'
  };

  return new Promise((resolve, reject) => {
    s3Instance.upload(params, function(err, data) {
      if (err) {
          reject(err);
      }
      const uploadResultObject = {
        fileUrl: data.Location,
        postUniqueName: destFileName
      };
      resolve(uploadResultObject);
  });
  });
};

module.exports = uploadFileToS3;