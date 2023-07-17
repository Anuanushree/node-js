const { request } = require("../app");

const logger= require('./logger')
const requestLogger = (request, response, next) => {
    logger.info('method:', request.method);
    logger.info('path:', request.path);
    logger.info('body:', request.body);
    logger.info('----------------');
    next();
}

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' });

}
module.exports={
    requestLogger,
    unknownEndpoint
}