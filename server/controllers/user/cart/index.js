// const config = require('../utils/config')
const dataController = require('../../../models/userCart_model')
const productController = require('../../../models/product_model')
// const { error } = require('../utils/logger')
const mongoose = require('mongoose')

  // Cart.aggregate([{ "$match": { "uuid": req.query.id } }, {
  //   $lookup: {
  //     from: "products", // collection name in db
  //     localField: "cart.id",
  //     foreignField: "_id",
  //     as: "item"
  //   }
  // }]).then(result => {
  //   result.forEach(group => {
  //     data.push(group)
  //   })
  //   res.status(200).send(result[0].item)
  // })

const getCart = (req, res, next) => {
  let data = []
  const Cart = dataController
  mongoose.connection
  mongoose.connection.readyState
  Cart.findOne({ "uuid": req.query.id }).populate("cart.id", ['name', 'ean', 'price', 'imageUrl', 'hierarchy'])
    .then(result => {
      let total = 0.0
      result.cart.map(({id, amount}) => {
        total += parseFloat(id.price) * amount
      })
      const with_category = result.cart.map(({ id, amount }) =>
        ({ amount: amount, id: id, category:id.hierarchy[id.hierarchy.length-1].name }))
      total = Math.round(total * 100) / 100
      res.status(200).send({total,items: with_category})
    })
}

const createCart = async (req, res, next) => {
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
          uuid: req.query.id
        }, { $push: { cart: { id: item._id, amount: 1 } } })
          .then(updatedDoc => {
            // Handle the updated document
            res.status(200).send(updatedDoc)
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

const productChange = async (req, res, next) => {
  let data = []
  console.log(req.query)

  const Cart = dataController
  mongoose.connection
  mongoose.connection.readyState
  await Cart.findOneAndUpdate({
    uuid: req.query.id
  }, { $push: { products: { id: req.query.product } } })

  res.status(200).end()
}


module.exports = {
  getCart, createCart, productToCart
}