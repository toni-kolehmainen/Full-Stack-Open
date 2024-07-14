// import { deleteUser, createUser} from '../controllers/user.js';
// const dataController = require('../controllers/user')
const { restart } = require('nodemon')
const config = require('../utils/config')
const dataController = require('../models/groups_model')
const dataControllerSec = require('../models/store_model')
const { error } = require('../utils/logger')
const mongoose = require('mongoose')

const getTest = (request, response , next) => {
  const Sec = dataControllerSec
  Sec.find({})
    .then(docs => {
      console.log("test")
      console.log(docs)
      response.status(200).end()
    })
    .catch(err => console.error(err));
}

const createMongo = (request, response, next) => {
  // reCreateConnection()
  const Sec = dataControllerSec
  const groups = new Sec({
    name:"test",
  })
  groups.save().then(result => {
    console.log('restaurant saved!')
    // mongoose.connection.close()
    response.status(200).end()
  })
}

const getGroups = (request, response, next) => {
  const Groups = dataController
  let data = []
  mongoose.connection
  mongoose.connection.readyState
  Groups.find({}).then(result => {
    result.forEach(group => {
      console.log(group)
      data.push(group)
    })
    response.status(200).send(data)
  })
}

module.exports = {
  getTest, getGroups, createMongo
}