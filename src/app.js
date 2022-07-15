const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())


let posts = [
    {
        "id": 1,
        "title": "Banner solo con html y css",
        "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur venenatis tristique tortor non pellentesque. Curabitur ut est eleifend, ultrices urna maximus, interdum ligula. Mauris tempor libero massa, consectetur efficitur orci pellentesque non. Proin sit amet enim sit amet massa maximus lacinia. Vestibulum accumsan enim elit, id ultricies enim ultricies nec. Donec enim leo, placerat eu quam non, semper pulvinar augue. Donec ut diam accumsan, pharetra diam id, interdum ligula. Vestibulum iaculis auctor suscipit. Nam vestibulum lorem non tempus pellentesque. Curabitur tempor faucibus ante, vitae luctus orci rhoncus tincidunt. Morbi auctor euismod velit sed eleifend. Phasellus id nisi non neque lobortis euismod. Maecenas egestas condimentum erat. Duis vel lectus quis ipsum dapibus laoreet a id risus. Aenean vel ultrices purus",
        "date": "2022-07-15T03:41:28.389Z",
        "imgSrc":"https://miro.medium.com/max/1400/1*k7jmNNboDV1eTL51Jnyo2w.jpeg"
    },
    {
        "id": 2,
        "title": "meno animado solo con javascript",
        "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur venenatis tristique tortor non pellentesque. Curabitur ut est eleifend, ultrices urna maximus, interdum ligula. Mauris tempor libero massa, consectetur efficitur orci pellentesque non. Proin sit amet enim sit amet massa maximus lacinia. Vestibulum accumsan enim elit, id ultricies enim ultricies nec. Donec enim leo, placerat eu quam non, semper pulvinar augue. Donec ut diam accumsan, pharetra diam id, interdum ligula. Vestibulum iaculis auctor suscipit. Nam vestibulum lorem non tempus pellentesque. Curabitur tempor faucibus ante, vitae luctus orci rhoncus tincidunt. Morbi auctor euismod velit sed eleifend. Phasellus id nisi non neque lobortis euismod. Maecenas egestas condimentum erat. Duis vel lectus quis ipsum dapibus laoreet a id risus. Aenean vel ultrices purus",
        "date": "2022-07-15T03:43:39.383Z",
        "imgSrc":"https://miro.medium.com/max/1400/1*k7jmNNboDV1eTL51Jnyo2w.jpeg"
    },
    {
        "id": 3,
        "title": "entiende el dom a la perfeccion",
        "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur venenatis tristique tortor non pellentesque. Curabitur ut est eleifend, ultrices urna maximus, interdum ligula. Mauris tempor libero massa, consectetur efficitur orci pellentesque non. Proin sit amet enim sit amet massa maximus lacinia. Vestibulum accumsan enim elit, id ultricies enim ultricies nec. Donec enim leo, placerat eu quam non, semper pulvinar augue. Donec ut diam accumsan, pharetra diam id, interdum ligula. Vestibulum iaculis auctor suscipit. Nam vestibulum lorem non tempus pellentesque. Curabitur tempor faucibus ante, vitae luctus orci rhoncus tincidunt. Morbi auctor euismod velit sed eleifend. Phasellus id nisi non neque lobortis euismod. Maecenas egestas condimentum erat. Duis vel lectus quis ipsum dapibus laoreet a id risus. Aenean vel ultrices purus",
        "date": "2022-07-15T03:43:39.383Z",
        "imgSrc":"https://miro.medium.com/max/1400/1*k7jmNNboDV1eTL51Jnyo2w.jpeg"
    }
]

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
    response.json(posts)
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