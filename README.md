# Image Sharing App API
An API built in NodeJS, to upload images and see latest timeline/feed (similar to Instagram).

## Features
- Server Sent Events to push the latest posts to the client.
- Image uploaded by client is saved to AWS S3 bucket.
- Users data and posts data is saved in MYSQL DB.
- Microservice architecture.
- Proper error handling.

## How to run
For /upload-image API:
1. Clone the repository. Go to /upload-image directory.
2. Run npm install.
3. Create a .env file with the following variables inside it:
    -  PORT_NUMBER (Port to expose the upload-image api at)
    - SSE_API_ENDPOINT (Server Sent Event endpoint from /feeds api in the same repo)
    - AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_BUCKET_NAME (AWS S3 bucket details)
    - DB_HOST, DB_USER, DB_PASSWORD, DB_NAME (MYSQL DB details)
4. Run "npm start" command.

For /feeds API:
1. Go to /feeds directory.
2. Run npm install.
3. Create a .env file with the following variables inside it:
    -  PORT_NUMBER (Port to expose the upload-image api at)
    - DB_HOST, DB_USER, DB_PASSWORD, DB_NAME (MYSQL DB details)
4. Run "npm start" command.

## Request and Response
For /upload-image API:
```
POST
http://192.168.43.153:4000/upload-image

fileContent: base64 encoded string of the image to be uploaded,
FileContentType: MIME type of the image to be uploaded,
username: "johndoe",
post_description: "sample post description",
fileName: "fileName.png"
```

```
{
    message: "post uploaded successfully"
}
```

For /get-feed API:
```
GET
http://192.168.43.153:4001/get-feed
```
```
[
    {
        "post_id": "1234",
        "post_url": "https://image-sharing-app.s3.us-east-2.amazonaws.com/posts/scenery.jpg",
        "post_description": "Just experienced northern lights. Dream comes true!",
        "post_timestamp": "2020-11-19T18:58:28.000Z",
        "username": "johndoe",
        "profile_image": "https://image-sharing-app.s3.us-east-2.amazonaws.com/posts/user1.jpg"
    },
    {
        "post_id": "2345",
        "post_url": "https://image-sharing-app.s3.us-east-2.amazonaws.com/posts/bookshelf.jpeg",
        "post_description": "Have a look at my brand new bookshelf.",
        "post_timestamp": "2020-11-20T18:58:28.000Z",
        "username": "jack_willey",
        "profile_image": "https://image-sharing-app.s3.us-east-2.amazonaws.com/posts/user2.jpg"
    }
]
```

For /get-feed-server-sent API for Server Sent Events
```
GET
http://192.168.43.153:4001/get-feed-server-sent
```
The connection is kept open. As and when a new post is created by any user the following response is sent to the client as a stream
```
HEADER 'Content-Type': 'text/event-stream'

{"post_id": "1234"}
{"post_url": "https://image-sharing-app.s3.us-east-2.amazonaws.com/posts/bookshelf.jpeg"}
{"post_description": "Have a look at my brand new bookshelf."}
{"post_timestamp": "2020-11-20T18:58:28.000Z"}
{"username": "jack_willey"}
{"profile_image": "https://image-sharing-app.s3.us-east-2.amazonaws.com/posts/user2.jpg"}
{"endOfMsg": "true"}
```