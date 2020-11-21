const s3Instance = require('./s3-instance');

const uploadFileToS3 = (dataObject) => {
  const { username, fileContent, FileContentType } = dataObject;
  const destFileName = username + new Date().getTime();
  // Setting up S3 upload parameters
  const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: destFileName, // File name you want to save as in S3
      Body: fileContent,
      ContentType:  FileContentType
  };

  return new Promise((resolve, reject) => {
    s3Instance.upload(params, function(err, data) {
      if (err) {
        console.log('error while uploading... ', err);
          reject(err);
      }
      console.log(`File uploaded successfully. ${data.Location}`, data);
      const uploadResultObject = {
        fileUrl: data.Location,
        postUniqueName: destFileName
      };
      resolve(uploadResultObject);
  });
  });
};

module.exports = uploadFileToS3;