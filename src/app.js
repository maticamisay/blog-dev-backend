require("dotenv").config();
require("./mongo");

const Post = require("./models/Post");
const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

let posts = [];

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
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
      if (post) {
        return response.json(post);
      } else {
        response.status(404).end();
      }
    })
    .catch((err) => {
      next(err);
    });
});

app.delete("/api/posts/:id", (request, response, next) => {
  const { id } = request.params;
  Post.findByIdAndRemove(id)
    .then((result) => {
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

  Post.findByIdAndUpdate(id, newPostInfo)
    .then(result => {
      response.status(200).json(result);
    })
    .catch(error => next(error));

  response.status(204).end();
});

app.post("/api/posts", (request, response) => {
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
  });
});

app.use((error, request, response, next) => {
  console.log(error);
  if (error.name == "CastError") {
    response.status(400).send({ error: "id use is malformed" });
  }
  if (error.name == "TypeError") {
    response.status(400).send({ error: "an typeerror has happen" });
  } else {
    response.status(500).end();
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
