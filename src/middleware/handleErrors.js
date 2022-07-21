module.exports = (error, request, response, next) => {
    console.log(error.name);
    if (error.name === 'CastError') {
        response.status(400).send({ error: "id use is malformed" });
    }
    if (error.name == "TypeError") {
        response.status(400).send({ error: "an typeerror has happen" });
    } else {
        response.status(500).end();
    }
}