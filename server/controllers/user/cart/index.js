// const config = require('../utils/config')
const dataController = require('../../../models/userCart_model')
// const { error } = require('../utils/logger')
const mongoose = require('mongoose')

const getCart = (req, res, next) => {
  let data = []
  const Cart = dataController
  mongoose.connection
  mongoose.connection.readyState
  console.log(req.query.id)
  Cart.aggregate([{ "$match": { "uuid": req.query.id } },{
    $lookup: {
        from: "products", // collection name in db
        localField: "products.id",
        // foreignField: "_id",
        foreignField: "ean",
        as: "item"
    }
}]).then(result => {
    result.forEach(group => {
      console.log(group)
      data.push(group)
    })
    res.status(200).send(data)
  })

  // Products.find({
    // 'usercarts.uuid': req.query.id
    // "products.id": { "$in": 'usercarts.products' }
    // $and:[
    // {uuid: req.query.id},
    // {'products.id': { $all: 'usercarts.products' }}]
  // }).populate('usercarts').then(result => {
  //   result.forEach(group => {
  //     console.log(group)
  //     data.push(group)
  //   })
  //   res.status(200).send(data)
  // })
}

const createCart = async (req, res, next) => {
  let data = []
  console.log("getCart")
  console.log(req.query)

  const uuid = req.query.id
  const isSigned = false
  const Cart = dataController
  mongoose.connection
  mongoose.connection.readyState
  const cart = new Cart({
    uuid,
    isSigned,
  })
  const savedCart = await cart.save()
  res.status(200).send(savedCart)
}

const productToCart = async (req, res, next) => {
  let data = []
  console.log(req.query)

  const Cart = dataController
  mongoose.connection
  mongoose.connection.readyState

  await Cart.findOneAndUpdate ({
    uuid: req.query.id
  }, { $push: { products: { id :req.query.product }} })

    res.status(200).end()
}

const productChange = async (req, res, next) => {
  let data = []
  console.log(req.query)

  const Cart = dataController
  mongoose.connection
  mongoose.connection.readyState
  await Cart.findOneAndUpdate ({
    uuid: req.query.id
  }, { $push: { products: { id :req.query.product }} })

    res.status(200).end()
}


module.exports = {
  getCart, createCart, productToCart
}