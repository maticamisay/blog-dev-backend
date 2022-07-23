const { model, Schema } = require('mongoose')

const postSchema = new Schema({
    title: String,
    content: String,
    date: Date,
    imgSrc: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

postSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Post = model('Post', postSchema)

module.exports = Post