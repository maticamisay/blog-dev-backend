require("dotenv").config();
require("./mongo");

const express = require("express");
const cors = require("cors");

const app = express();

const notFound = require('./middleware/notFound.js')
const handleErrors = require('./middleware/handleErrors.js');
const usersRouter = require('./controllers/users')
const postsRouter = require('./controllers/posts')

app.use(cors());
app.use(express.json());
app.get("/", (request, response) => {
  response.send("<h1>Bienvenido a mi API de mi blog de programación</h1>");
});

app.use('/api/posts', postsRouter)
app.use('/api/users', usersRouter)

app.use(notFound);
app.use(handleErrors);

const PORT = process.env.PORT || 3001;
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = { app, server }