require('./mongo')

const Post = require('./models/Post')
const express = require('express')
const app = express()
const cors = require('cors')


app.use(cors())
app.use(express.json())


let posts = []

const generateId = () => {
    const postsIds = posts.map(n => n.id)
    const maxId = postsIds.length ? Math.max(...postsIds) : 0
    const newId = maxId + 1
    return newId
}

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/api/posts', (request, response) => {
    Post.find({}).then(posts => {
    response.json(posts)    
    })
})

app.get('/api/posts/:id', (request, response) => {
    const id = Number(request.params.id)
    const post = posts.find(note => note.id === id)

    if (post) {
        return response.json(post)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/posts/:id', (request, response) => {
    const id = Number(request.params.id)
    posts = posts.filter(post => post.id !== id)

    response.status(204).end()
})

app.post('/api/posts', (request, response) => {
    const post = request.body

    if (!post.title) {
        return response.status(400).json({
            error: 'required "content" field is missing'
        })
    }

    const newPost = {
        id: generateId(),
        title: post.title,
        content: post.content,
        date: new Date()
    }

    posts = posts.concat(newPost)

    response.json(post)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})