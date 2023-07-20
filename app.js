const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const logger = require('./utils/logger');
const config = require('./utils/config');
const middleware = require('./utils/middleware');
const usersRouter = require('./controllers/users');
const resetRouter = require('./controllers/reset');
const resetpassword = require('./controllers/resetpassword')

mongoose.set('strictQuery', false);
logger.info('connecting to', config.MONGODB_URL);

mongoose.connect(config.MONGODB_URL)
    .then(() => {
        logger.info('Connected to MongoDB');
    })
    .catch((err) => {
        logger.error(err);
    });

app.use(cors());
app.use(express.json());


app.use(middleware.requestLogger);

app.use('/api/users', usersRouter);
app.use('/api/users/reset', resetRouter);
app.use('/api/reset',resetpassword);

app.use(middleware.unknownEndpoint);

module.exports = app;