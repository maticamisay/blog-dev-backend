const postsRouter = require('express').Router()
const Post = require("../models/Post");
const User = require('../models/User');


postsRouter.get("/", async (request, response) => {
    const posts = await Post.find({}).populate('user', {
        username: 1, name: 1, _id: 0
    })
    response.json(posts);
});

postsRouter.get("/:id", (request, response, next) => {
    const { id } = request.params;
    // const post = posts.find(note => note.id === id)
    Post.findById(id)
        .then((post) => {
            return post ? response.json(post) : response.status(404).end()
        })
        .catch((err) => {
            console.log(err);
            next(err);
        });
});

postsRouter.delete("/:id", async (request, response, next) => {
    const { id } = request.params;
    Post.findByIdAndDelete(id)
        .then(() => response.status(204).end())
        .catch(next)
});

postsRouter.put("/:id", (request, response, next) => {
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

postsRouter.post("/", async (request, response, next) => {
  const { title, content, imgSrc, userId } = request.body;

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
  } catch (e) {
    next(e);
  }
});

module.exports = postsRouter