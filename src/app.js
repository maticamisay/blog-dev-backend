require("dotenv").config();
require("./mongo");

const express = require("express");
const app = express();
const cors = require("cors");

const notFound = require('./middleware/notFound.js')
const handleErrors = require('./middleware/handleErrors.js');
const usersRouter = require('./controllers/users')
const Post = require("./models/Post");
const User = require("./models/User");

app.use(cors());
app.use(express.json());
app.get("/", (request, response) => {
  response.send("<h1>Bienvenido a mi API de mi blog de programación</h1>");
});

app.get("/api/posts", async (request, response) => {
  const posts = await Post.find({})
  response.json(posts);
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

app.delete("/api/posts/:id",async (request, response, next) => {
  const { id } = request.params;
  Post.findByIdAndDelete(id)
    .then(() => response.status(204).end())
    .catch(next)
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

app.post("/api/posts", async (request, response, next) => {
  const {title,content,imgSrc,userId} = request.body;

  const user = await User.findById(userId)
  if (!title) {
    return response.status(400).json({
      error: 'required "title" field is missing',
    });
  }

  const newPost = new Post({
    title: title,
    content: content,
    imgSrc,
    user: user._id,
    date: new Date(),
  });
  // newPost.save().then((savedPost) => {
  //   response.json(savedPost);
  // }).catch(err => next(err))
  try {
    const savedPost = await newPost.save()
    
    user.posts = user.posts.concat(savedPost._id)
    await user.save()

    response.json(savedPost)
  } catch(e){
    next(e);
  }
});

app.use('/api/users', usersRouter)

app.use(notFound);
app.use(handleErrors);

const PORT = process.env.PORT || 3001;
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
module.exports = { app, server }