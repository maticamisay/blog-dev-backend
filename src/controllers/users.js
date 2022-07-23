const bcrypt = require('bcrypt')
const express = require('express')
const usersRouter = express.Router()
const User = require('../models/User')

usersRouter.post('/', async (req, res) => {
    const { body } = req
    const { username, name, password } = body
    const passwordHash = await bcrypt.hash(password, 10)
    console.log(body);
    const user = new User({
        username,
        name,
        passwordHash
    })

    const savedUser = await user.save()
    return res.json(savedUser)
})

module.exports = usersRouter