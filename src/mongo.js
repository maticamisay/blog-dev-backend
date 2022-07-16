const mongoose = require('mongoose');
const connectionString = `mongodb+srv://root:root@cluster0.cx5lw.mongodb.net/blog-dev`

mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('Database connected');
    }).catch(err => {
        console.log(err);
    })

