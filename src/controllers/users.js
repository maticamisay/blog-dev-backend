const bcrypt = require('bcrypt')
const { response } = require('express')
const express = require('express')
const usersRouter = express.Router()
const User = require('../models/User')

usersRouter.get('/',async(req,res)=>{
  const users = await User.find({})
  res.json(users)
})

usersRouter.post('/', async (req, res, next) => {
    const { body } = req
    const { username, name, password } = body

    const passwordHash = await bcrypt.hash(password, 10)

    const user = new User({
        username,
        name,
        passwordHash
    })

    try {
        const savedUser = await user.save()
        res.status(201).json(savedUser)
      } catch(e){
        next(e);
      }
})

module.exports = usersRouter