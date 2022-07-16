const { model, Schema } = require('mongoose')

const postSchema = new Schema({
    title: String,
    content: String,
    date: Date,
    imgSrc: String,
})

postSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Post = model('Post', postSchema)


// const post = new Post({
//     title: 'Banner solo con html y css',
//     content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur venenatis tristique tortor non pellentesque. Curabitur ut est eleifend, ultrices urna maximus, interdum ligula. Mauris tempor libero massa, consectetur efficitur orci pellentesque non. Proin sit amet enim sit amet massa maximus lacinia. Vestibulum accumsan enim elit, id ultricies enim ultricies nec.',
//     date: new Date(),
//     imgSrc: "https://miro.medium.com/max/1400/1*k7jmNNboDV1eTL51Jnyo2w.jpeg"
// })

// post.save()
//     .then(result => {
//         console.log(result);
//         mongoose.connection.close()
//     })
//     .catch(err => {
//         console.log(err);
//     })

module.exports = Post