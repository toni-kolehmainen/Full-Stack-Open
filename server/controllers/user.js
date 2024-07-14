const { restart } = require('nodemon')
const config = require('../utils/config')
const dataController = require('../models/user_model')
const { error } = require('../utils/logger')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const findEmail = (email) => {
  const User = dataController
  return User.findOne({ email }).then((e => {
    return (!e) ? false : true
  }))
}

const SignIn = (req, res, next) => {
  console.log("SignIn")

  jwt.sign(userForToken, process.env.JWT_SECRET)
  const User = dataController
  
}

const getUserInfo = (req, res, next) => {
  console.log("find user")
  const User = dataController

  User.findOne(({
    where: { id_store: req.body.storeId }
  }))
    .then((store) => {
      // found
      res.status(200).json({ message: "workout created", data: JSON.parse(store.data) });
      // not found
      res.status(404).end()
    })
    .catch(err => {
      console.log(err);
      res.status(502).json({ message: "error while creating the Exericise" });
    });
}

const createUser = async (req, res, next) => {

  if (!req.body) {
    res.status(400).json({
      error: 'content missing'
    })
  }

  const email = req.body.email
  if (await findEmail(email)) {
    res.status(401).json({message:"email allready used"})
  }
  const saltRounds = 10;
  const password = await bcrypt.hash(req.body.password, saltRounds)

  const User = dataController
  const user = new User({
    email,
    password,
  })
  const savedUser = await user.save()
  console.log(savedUser)
  if (!savedUser) {
    res.status(201).json({message:"user added successfully"})
  }
  res.status(401).json({error:"adding user"})
}

const deleteUser = (req, res, next) => {
  console.log("create user")
  if (true) {
    res.status(204).end()
  } else {
    res.status(404).end()
  }
  // res.status(404).end() // no data
  // .then((store) => {
  //     res.status(200).json({message: "workout created", data:JSON.parse(store.data)});
  // })
  // .catch(err => {
  //     console.log(err);
  //     res.status(502).json({message: "error while creating the Exericise"});
  // });
}
module.exports = {
  deleteUser,
  createUser,
  SignIn,
}