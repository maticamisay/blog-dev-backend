const ERROR_HANDLERS = {
    CastError: res => res.status(400).send({ error: "id use is malformed" }),
    TypeError: res => res.status(400).send({ error: "an typeerror has happen" }),
    ValidationError: (res, { message }) => res.status(409).send({
        error: message
    }),
    TokenExpirerError: res => res.status(401).json({ error: 'token expired' }),
    JsonWebTokenError: res => res.status(401).json({ error: 'token missing or invalid' }),
    defaultError: res => res.status(500).end()
}

module.exports = (error, request, response, next) => {
    console.error(error.name);
    const handler = ERROR_HANDLERS[error.name] || ERROR_HANDLERS.defaultError
    handler(response, error)

    // if (error.name === 'CastError') {
    //     response.status(400).send({ error: "id use is malformed" });
    // } else if (error.name === "TypeError") {
    //     response.status(400).send({ error: "an typeerror has happen" });
    // } else if (error.name === 'ValidationError') {
    //     response.status(409).send({
    //         error: error.message
    //     })
    // } else if (error.name === 'JsonWebTokenError') {
    //     response.status(401).json({ error: 'token missing or invalid' })
    // } else {
    //     response.status(500).end()
    // }
}