const moment = require('moment');
const dbConnection = require('./db-instance');

const savePostToDB = (uploadResponse, reqObj) => {
  return new Promise((resolve, reject) => {
    const currentTimestamp = moment().format('YYYY-MM-DD hh:mm:ss');
    console.log('currentTimestamp ', currentTimestamp);
    const { postUniqueName, fileUrl } = uploadResponse;
    const { post_description, username } = reqObj;

    dbConnection.query(`INSERT INTO imageSharingPosts VALUES ('${fileUrl}', '${post_description}', '${currentTimestamp}', '${username}', '${postUniqueName}');`, function (err, result, fields) {
      if (err){
        console.log('error occurred ', err);
        reject(err);
      }
      console.log('result from db ', result);
      resolve(result);
    });
  });
};

module.exports = savePostToDB;