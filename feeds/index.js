require('dotenv').config();

const express = require('express');
const cors = require('cors');
const events = require('events');
const moment = require('moment');

const errorHandler = require('./middlewares/error-handler');
const DatabaseError = require('./errors/database-error');
const { getPostsFromDB, getDisplayPictureForUsername } = require('./db-connection/db.utils');
const CustomError = require('./errors/custom-error');
const myEmitter = new events.EventEmitter();

const app = express();
app.use(express.json());
app.use(cors());

// get-feed API
app.get('/get-feed', async (req, res, next) => {

  try {
    // Calling the method to fetch all posts from the database.
    const allPosts = await getPostsFromDB();
    res.status(200).send(allPosts);
  } catch(err) {
    // Catch the error encountered while fetching all posts from the database.
    next(new DatabaseError(err));
    return;
  }

});

// server sent event to send new post to the client.
app.get('/get-feed-server-sent', (req, res) => {

  // Set the content type to event-stream which helps in establishing a SSE connection.
  const headers = {
    'Content-Type': 'text/event-stream'
  };
  res.writeHead(200, headers);

  // Send the data stream to the client.
  myEmitter.on('newpost', (data) => {
    res.write(`data: {\n`);
    res.write(`data: "post_id": "${data.post_id}",\n`);
    res.write(`data: "post_url": "${data.post_url}",\n`);
    res.write(`data: "post_description": "${data.post_description}",\n`);
    res.write(`data: "post_timestamp": "${data.post_timestamp}",\n`);
    res.write(`data: "username": "${data.username}",\n`);
    res.write(`data: "profile_image": "${data.profile_image}"\n`);
    res.write(`data: }\n\n`);
  });

});

// POST API call to emit the event needed to triger the server sent event.
app.post('/get-feed-server-sent', async (req, res, next) => {

  try{
    const { fileUrl, postUniqueName, username, post_description } = req.body;

    const dbResult = await getDisplayPictureForUsername(username);
    const newPostDetails = {
      post_id: postUniqueName,
      post_url: fileUrl,
      post_description: post_description,
      post_timestamp: moment().format('YYYY-MM-DD hh:mm:ss'),
      username: username,
      profile_image: dbResult[0].profile_image
  };

    // Emit the event triggering the server sent event.
    myEmitter.emit('newpost', newPostDetails);
    res.status(200).send('success');
  }catch(err){
    next(new CustomError(err));
  }
  
});

app.use(errorHandler);

app.listen(process.env.PORT_NUMBER, () => {
  console.log(`Listening on ${process.env.PORT_NUMBER}`);
});