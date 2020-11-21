const moment = require('moment');
const dbConnection = require('./db-instance');

// Method to save a new post upload details to the MySQL DB.
const savePostToDB = (uploadResponse, reqObj) => {
  return new Promise((resolve, reject) => {
    const currentTimestamp = moment().format('YYYY-MM-DD hh:mm:ss');
    const { postUniqueName, fileUrl } = uploadResponse;
    const { post_description, username } = reqObj;

    dbConnection.query(`INSERT INTO imageSharingPosts VALUES ('${fileUrl}', '${post_description}', '${currentTimestamp}', '${username}', '${postUniqueName}');`, function (err, result, fields) {
      if (err){
        reject(err);
      }
      resolve(result);
    });
  });
};

module.exports = savePostToDB;