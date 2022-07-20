const mongoose = require('mongoose')
const { server } = require('../app')
const { initialPosts, api, getAllContentFromPosts } = require('./helper.js')
const Post = require('../models/Post.js')

beforeEach(async () => {
    await Post.deleteMany({})
    const note1 = new Post(initialPosts[0])
    await note1.save()
    const note2 = new Post(initialPosts[1])
    await note2.save()
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

    const {titles, response} = await getAllContentFromPosts()
    expect(response.body).toHaveLength(initialPosts.length + 1)
    expect(titles).toContain(newPost.title)
})

afterAll(() => {
    mongoose.connection.close()
    server.close()
})