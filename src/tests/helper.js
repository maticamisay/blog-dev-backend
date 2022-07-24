const supertest = require('supertest')
const { app } = require('../app')
const User = require('../models/User')
const api = supertest(app)


const initialPosts = [
    {
        title: "Banner solo con html y css",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ven…",
        date: '2022-07-16T05:29:35.913+00:00',
        imgSrc: "https://miro.medium.com/max/1400/1*k7jmNNboDV1eTL51Jnyo2w.jpeg"
    },
    {
        title: "Banner con javascript",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ven…",
        date: '2022-07-16T05:29:35.913+00:00',
        imgSrc: "https://miro.medium.com/max/1400/1*k7jmNNboDV1eTL51Jnyo2w.jpeg"
    }
]

const getAllContentFromPosts = async () => {
    const response = await api.get('/api/posts')
    return { titles: response.body.map(post => post.title), response }
}

const getUsers = async () => {
    const usersDB = await User.find({})
    return usersDB.map(user => user.toJSON())

}

module.exports = { api, initialPosts, getAllContentFromPosts, getUsers }