const mongoose = require('mongoose')
const { server } = require('../app')
const { initialPosts, api, getAllContentFromPosts } = require('./helper.js')
const Post = require('../models/Post.js')

beforeEach(async () => {
    await Post.deleteMany({})
    for (const post of initialPosts) {
        const postObject = new Post(post)
        await postObject.save()
      }
})

test('posts are returned as json', async () => {
    await api
        .get('/api/posts')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('there are two posts', async () => {
    const response = await api.get('/api/posts')
    expect(response.body).toHaveLength(initialPosts.length)
})

test('a valid post can be added', async () => {
    const newPost = {
        title: "test de titulo",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ven…",
        date: '2022-07-16T05:29:35.913+00:00',
        imgSrc: "https://miro.medium.com/max/1400/1*k7jmNNboDV1eTL51Jnyo2w.jpeg"
    }
    await api
        .post('/api/posts')
        .send(newPost)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const { titles, response } = await getAllContentFromPosts()
    expect(response.body).toHaveLength(initialPosts.length + 1)
    expect(titles).toContain(newPost.title)
})

test('note without title is not added', async () => {
    const newPost = {
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ven…",
        date: '2022-07-16T05:29:35.913+00:00',
        imgSrc: "https://miro.medium.com/max/1400/1*k7jmNNboDV1eTL51Jnyo2w.jpeg"
    }
    await api
        .post('/api/posts')
        .send(newPost)
        .expect(400)

    const { response } = await getAllContentFromPosts()
    expect(response.body).toHaveLength(initialPosts.length)
})

test('a note can be deleted', async () => {
    const { response: firstResponse } = await getAllContentFromPosts()
    const { body: posts } = firstResponse
    const postToDelete = posts[0]
    await api
        .delete(`/api/posts/${postToDelete.id}`)
        .expect(204)

    const { titles, response: secondResponse } = await getAllContentFromPosts()
    expect(secondResponse.body).toHaveLength(initialPosts.length - 1)
    expect(titles).not.toContain(postToDelete.title)
})

test('a post that do not exist can not be deleted', async () => {
    await api
      .delete('/api/posts/1234gbe')
      .expect(400)
  
    const { response } = await getAllContentFromPosts()
  
    expect(response.body).toHaveLength(initialPosts.length)
  })
afterAll(() => {
    mongoose.connection.close()
    server.close()
})