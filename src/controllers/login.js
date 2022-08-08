const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/User')
const userExtractor = require('../middleware/userExtractor')

loginRouter.post('/', async (request, response) => {
    const { body } = request
    const { username, password } = body
    const user = await User.findOne({ username })
    const passwordCorrect = user === null
        ? false
        : await bcrypt.compare(password, user.passwordHash)

    if (!(user && passwordCorrect)) {
        response.status(401).json({ error: 'invalid user or password' })
    }
    const userForToken = {
        id: user._id,
        username: user.username
    }
    const token = jwt.sign(userForToken, process.env.SECRET, {
        // expira en 30 minutos
        expiresIn: 60*30
    })

    response.send({ name: user.name, username: user.username, token })
})
loginRouter.post('/jwt', userExtractor, async (request, response, next) => {
    const { userId } = request
    const user = await User.findById(userId)
    if (user) {
        response.status(200).json({ loggedIn: true, user:user })
    } else {
        response.status(401).json({ error: 'expired token' })
    }
})

module.exports = loginRouter