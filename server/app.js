const express = require('express')
const config = require('./utils/config')
const craw = require('./controllers/crawlTest')
const app = express()
const cors = require('cors')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const router = require('./router/router')
const mongoose = require('mongoose')

console.log(config.MONGODB_URI)
// tänään connect
// lue osa 4
// git commit/push
// mongoose connect
// craw.serviceTest()
mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
  })

app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(cors());

app.use((_, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});
app.use(middleware.requestLogger)

app.use(router);

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
