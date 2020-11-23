const dbConnection = require('./db-instance');

// Method to save a new post upload details to the MySQL DB.
const getPostsFromDB = () => {
  return new Promise((resolve, reject) => {

    dbConnection.query(`
      SELECT imageSharingPosts.post_id, imageSharingPosts.post_url, imageSharingPosts.post_description, imageSharingPosts.post_timestamp, imageSharingPosts.username, imageSharingUsers.profile_image
      FROM imageSharingPosts
      INNER JOIN imageSharingUsers ON imageSharingPosts.username=imageSharingUsers.username;`, function (err, result) {
      if (err){
        reject(err);
      }
      resolve(result);
    });
  });
};

// Method to save a new post upload details to the MySQL DB.
const getDisplayPictureForUsername= (username) => {
  return new Promise((resolve, reject) => {

    dbConnection.query(`
      SELECT profile_image
      FROM imageSharingUsers
      WHERE username='${username}';`, function (err, result) {
      if (err){
        reject(err);
      }
      resolve(result);
    });
  });
};

module.exports = {getPostsFromDB, getDisplayPictureForUsername};