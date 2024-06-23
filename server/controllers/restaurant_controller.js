// import { deleteUser, createUser} from '../controllers/user.js';
// const dataController = require('../controllers/user')
const { restart } = require('nodemon')
const config = require('../utils/config')
const dataController = require('../models/restaurant_model')
const { error } = require('../utils/logger')
const mongoose = require('mongoose')

async function reCreateConnection() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(config.MONGODB_URI)
    .then(() => {
      logger.info('connected to MongoDB')
    })
    .catch((error) => {
      logger.error('error connection to MongoDB:', error.message)
    })
  }
}
// const router = require('express').Router()
// const Note = require('../models/note')
// router.post('/deleteuser:id', dataController.deleteUser);

const createUser = (request, response, next) => {

}

const getUser = (request, response, next) => {
  
}
const getTest = (request, response , next) => {
  console.log("test")
  response.status(200).end()
}
const getdefault = (request, response, next) => {
  response.send('<h1>Hello World!</h1>')
}

// this


const createMongo = (request, response, next) => {
  // reCreateConnection()
  const Restaurant = dataController
  const restaurant = new Restaurant({
    name: request.body.name,
    address:request.body.address,
    link: request.body.link,
    takeaway: request.body.takeaway,
    drivein:request.body.drivein,
  })
  restaurant.save().then(result => {
    console.log('restaurant saved!')
    // mongoose.connection.close()
    response.status(200).end()
  })
}
const getMongo = (request, response, next) => {

  reCreateConnection()

  const Restaurant = dataController
  let data = []
  mongoose.connection
  mongoose.connection.readyState
  Restaurant.find({}).then(result => {
    result.forEach(restaurant => {
      console.log(restaurant)
      data.push(restaurant)
    })
    // mongoose.connection.close()
    response.status(200).send(data)
  })
}
const setMongo = (request, response, next) => {
  console.log("crawler")
  const testLink = ""
  
  

}


module.exports = {
  createUser, getUser, getTest, getdefault, createMongo, getMongo, setMongo
}