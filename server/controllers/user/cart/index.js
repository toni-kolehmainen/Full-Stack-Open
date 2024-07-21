// const config = require('../utils/config')
const dataController = require('../../../models/userCart_model')
const productController = require('../../../models/product_model')
// const { error } = require('../utils/logger')
const mongoose = require('mongoose')
const { error } = require('../../../utils/logger')

const getCart = (req, res, next) => {
  const Cart = dataController
  mongoose.connection
  mongoose.connection.readyState
  Cart.findOne({ "uuid": req.query.id }).populate("cart.id", ['name', 'ean', 'price', 'imageUrl', 'hierarchy'])
    .then(result => {
      if (!result) {
        return res.status(404).end()
      }
      let total = 0.0
      result.cart.map(({ id, amount }) => {
        total += parseFloat(id.price) * amount
      })
      const with_category = result.cart.map(({ id, amount }) =>
        ({ amount: amount, id: id, category: id.hierarchy[id.hierarchy.length - 1].name }))
      total = Math.round(total * 100) / 100
      res.status(200).send({ total, items: with_category })
    })
}

const createCart = async (req, res, next) => {
  const uuid = req.query.id
  const isSigned = false
  const Cart = dataController
  mongoose.connection
  mongoose.connection.readyState
  const cart = new Cart({
    uuid,
    isSigned,
  })
  cart.save().then(savedCart => {
    if (savedCart) {
      res.status(200).send(savedCart)
    } else {
      res.status(500).end()
    }
  })
    .catch(error => {
      // Handle any errors
      console.log(error);
      res.status(400).send(error)
    })

}
// Adds item to database and returns the added item back to a client
// Need user uuid and product id
const addItem = async (req, res, next) => {

  if (!(req.query.product && req.query.id)) {
    return res.status(400).send({ message: "query form is unmet correctly" })
  }
  const Cart = dataController
  const Product = productController
  mongoose.connection
  mongoose.connection.readyState

  Product.findOne({ _id: req.query.product })
    .select('_id')
    .then(item => {
      if (item) {
        Cart.findOneAndUpdate({
          uuid: req.query.id, 'cart.id': { $ne: req.query.product }
        }, { $push: { cart: { id: item._id, amount: 1 } } }, { new: true }).populate("cart.id", ['name', 'ean', 'price', 'imageUrl', 'hierarchy'])
          .then(updatedDoc => {
            // Handle the updated document
            if (updatedDoc) {
              const response = updatedDoc.cart.find(n => n.id.id === req.query.product)
              res.status(200).send(response)
            } else {
              res.status(400).end()
            }
          })
          .catch(error => {
            // Handle any errors
            console.log(error);
            res.status(500).send(error)
          })
      } else {
        res.status(400).end()
      }

    }).catch(error => {
      // Handle any errors
      console.log(error);
      res.status(500).send(error)
    });
}

const deleteItem = async (req, res, next) => {
  const Cart = dataController
  mongoose.connection
  mongoose.connection.readyState
  Cart.findOneAndUpdate({
    uuid: req.query.id, 'cart.id': req.query.product
  }, { $pull: { cart: { id: req.query.product } } }, { new: true })
    .then(updatedDoc => {
      // Handle the updated document
      if (updatedDoc) {
        res.status(200).send({ id: req.query.product })
      } else {
        res.status(400).end()
      }
    })
    .catch(error => {
      // Handle any errors
      console.log(error);
      res.status(500).send(error)
    })
}

// Adds quantity to item in database and returns the changes back to a client
const addQuantity = async (req, res, next) => {
  const Cart = dataController
  mongoose.connection
  mongoose.connection.readyState
  const item = await Cart.findOneAndUpdate(
    { uuid: req.query.id, 'cart.id': req.query.product },
    {
      $inc: { 'cart.$.amount': 1 }
    },
    { new: true }
  ).populate("cart.id", ['name', 'ean', 'price', 'imageUrl', 'hierarchy'])
    .then(updatedDoc => {
      // Handle the updated document
      if (updatedDoc) {
        const response = updatedDoc.cart.find(n => n.id.id === req.query.product)
        res.status(200).send(response)
      } else {
        res.status(400).end()
      }
    })
    .catch(error => {
      // Handle any errors
      console.log(error);
      res.status(500).send(error)
    })
}

const minusQuantity = async (req, res, next) => {
  const Cart = dataController
  const newAmount = req.query.amount - 1
  mongoose.connection
  mongoose.connection.readyState
  Cart.findOneAndUpdate(
    { uuid: req.query.id, 'cart.id': req.query.product },
    {
      $set: { 'cart.$.amount': newAmount }
    },
    { new: true, runValidators: true }
  ).populate("cart.id", ['name', 'ean', 'price', 'imageUrl', 'hierarchy'])
    .then(updatedDoc => {
      // Handle the updated document
      console.log(updatedDoc)
      if (updatedDoc) {
        const response = updatedDoc.cart.find(n => n.id.id === req.query.product)
        res.status(200).send(response)
      } else {
        res.status(400).end()
      }
    })
    .catch(error => {
      // Handle any errors
      console.log(error);
      res.status(500).send(error)
    })
}

module.exports = {
  getCart, createCart, addItem, addQuantity, minusQuantity, deleteItem
}