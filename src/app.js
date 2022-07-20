require("dotenv").config();
require("./mongo");

const Post = require("./models/Post");
const express = require("express");
const app = express();
const cors = require("cors");
const notFound = require('./middleware/notFound.js')
const handleErrors = require('./middleware/handleErrors.js');
app.use(cors());
app.use(express.json());

app.get("/", (request, response) => {
  response.send("<h1>Bienvenido a mi API de mi blog de programación</h1>");
});

app.get("/api/posts", (request, response) => {
  Post.find({}).then((posts) => {
    response.json(posts);
  });
});

app.get("/api/posts/:id", (request, response, next) => {
  const { id } = request.params;
  // const post = posts.find(note => note.id === id)
  Post.findById(id)
    .then((post) => {
      return note ? response.json(post) : response.status(404).end()
    })
    .catch((err) => {
      next(err);
    });
});

app.delete("/api/posts/:id", (request, response, next) => {
  const { id } = request.params;
  Post.findByIdAndRemove(id)
    .then(() => {
      response.status(204).end();
    })
    .catch((error) => next(error));

  response.status(204).end();
});

app.put("/api/posts/:id", (request, response, next) => {
  const { id } = request.params;
  const post = request.body
  const newPostInfo = {
    title: post.title,
    content: post.content,
    imgSrc: post.imgSrc,
  };

  Post.findByIdAndUpdate(id, newPostInfo, { new: true })
    .then(result => {
      response.status(200).json(result);
    })
    .catch(error => next(error));

});

app.post("/api/posts", (request, response, next) => {
  const post = request.body;
  if (!post.title) {
    return response.status(400).json({
      error: 'required "title" field is missing',
    });
  }
  const newPost = new Post({
    title: post.title,
    content: post.content,
    date: new Date(),
  });
  newPost.save().then((savedPost) => {
    response.json(savedPost);
  }).catch(err => next(err))
});

app.use(notFound)
app.use(handleErrors);

const PORT = process.env.PORT || 3001;
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
module.exports = {app, server}