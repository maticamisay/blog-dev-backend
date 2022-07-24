module.exports = (error, request, response, next) => {
    console.log(error.name);
    if (error.name === 'CastError') {
        response.status(400).send({ error: "id use is malformed" });
    }
    if (error.name == "TypeError") {
        response.status(400).send({ error: "an typeerror has happen" });
    } else if (error.name === 'ValidationError') {
        response.status(409).send({
            error: error.message
        })
    } else {
        response.status(500).end()
    }
}