const { restart } = require('nodemon')
const config = require('../utils/config')
const dataController = require('../models/product_model')
const { error } = require('../utils/logger')
const mongoose = require('mongoose')
const { writeFile, readFile } = require('fs');
const { time } = require('console')
const axios = require('axios');

/**
 * @param {Response} res The response
 * @param {Request} req The request
 */

const getProductTest = (req, res, next) => {

  let data = []
  const Product = dataController
  mongoose.connection
  mongoose.connection.readyState
  Product.find({ }).sort({ 'id': -1 }).skip(0).limit(10).then(result => {
    result.forEach(group => {
      data.push(group)
    })
    res.status(200).send(data)
  })
}

const getProductById = (req, res, next) => {
  // req.params.id
  let data = []
  const Product = dataController
  mongoose.connection
  mongoose.connection.readyState
  Product.find({ brand: req.body.brand }).sort({ 'id': -1 }).skip(req.body.limit).limit(req.body.skip).then(result => {
    result.forEach(group => {
      data.push(group)
    })
    res.status(200).send(data)
  })
}
const getProductBySlug = (req, res, next) => {

  let data = []
  const Product = dataController
  mongoose.connection
  mongoose.connection.readyState
  Product.find({ brand: req.body.brand }).sort({ 'id': -1 }).skip(req.body.limit).limit(req.body.skip).then(result => {
    result.forEach(group => {
      data.push(group)
    })
    res.status(200).send(data)
  })
}

const getProducts = (req, res, next) => {

  let data = []
  const Product = dataController
  mongoose.connection
  mongoose.connection.readyState
  Product.find().then(result => {
    console.log(result.length)
    result.forEach(group => {
      data.push(group)
      
    })
    res.status(200).send(data)
  })
}

const getTotal = async (limit, from, slug) => {
  let urlProductGroups = `https://cfapi.voikukka.fi/graphql?operationName=RemoteFilteredProducts&variables=%7B%22includeAvailabilities%22%3Afalse%2C%22facets%22%3A%5B%7B%22key%22%3A%22brandName%22%2C%22order%22%3A%22asc%22%7D%2C%7B%22key%22%3A%22labels%22%7D%5D%2C%22includeAgeLimitedByAlcohol%22%3Atrue%2C%22limit%22%3A${limit}%2C%22queryString%22%3A%22%22%2C%22searchProvider%22%3A%22loop54%22%2C%22slug%22%3A%22${slug}%22%2C%22storeId%22%3A%22513971200%22%2C%22useRandomId%22%3Atrue%2C%22from%22%3A${from}%7D&extensions=%7B%22persistedQuery%22%3A%7B%22version%22%3A1%2C%22sha256Hash%22%3A%221b6f3b8f2da410d0789d59b427cf86ad45047e953b165c28670b7e635c5918c6%22%7D%7D`

  return axios.get(urlProductGroups, {
    headers: {
      "content-type": "application/json"
    }
  }).then(response => {
    const data = response.data.data.store.products
    const total = data.total
    // console.log("getTotal", total)
    return total

  }).catch(error => {
    console.log(error);
    res.status(500).send()
  });
}

const getProductGroup = async (limit, from, slug) => {
  let urlProductGroups = `https://cfapi.voikukka.fi/graphql?operationName=RemoteFilteredProducts&variables=%7B%22includeAvailabilities%22%3Afalse%2C%22facets%22%3A%5B%7B%22key%22%3A%22brandName%22%2C%22order%22%3A%22asc%22%7D%2C%7B%22key%22%3A%22labels%22%7D%5D%2C%22includeAgeLimitedByAlcohol%22%3Atrue%2C%22limit%22%3A${limit}%2C%22queryString%22%3A%22%22%2C%22searchProvider%22%3A%22loop54%22%2C%22slug%22%3A%22${slug}%22%2C%22storeId%22%3A%22513971200%22%2C%22useRandomId%22%3Atrue%2C%22from%22%3A${from}%7D&extensions=%7B%22persistedQuery%22%3A%7B%22version%22%3A1%2C%22sha256Hash%22%3A%221b6f3b8f2da410d0789d59b427cf86ad45047e953b165c28670b7e635c5918c6%22%7D%7D`
  // console.log(urlProductGroups)
  return axios.get(urlProductGroups, {
    headers: {
      "content-type": "application/json"
    }
  }).then(response => {
    const data = response.data.data.store.products.items
    return data
  }).catch(error => {
  });
}
/**
 * @param {Response} res The response
 * @param {Request} req The request
 */
const addProducts = async (req, res, next) => {

  let combined_data = []
  let from = 0
  const slug = "juustot-0"
  const limit = 100
  const total = await getTotal(100, 0, slug)
  console.log(total)
  for (from; from <= total; from += limit) {

    // console.log(from)
    const data = await getProductGroup(limit, from, slug)
    combined_data = combined_data.concat(data)
  }
  // console.log(combined_data)
  const Product = dataController
  combined_data.map(async item => {
    const product = new Product({
    ean: item.ean,
    slug: item.slug,
    name: item.name,
    price:item.price,
    campaignPrice:item.pricing.campaignPrice,
    isAgeLimitedByAlcohol:item.isAgeLimitedByAlcohol,
    isNewProduct:item.isNewProduct,
    frozen:item.frozen,
    hierarchy:
    item.hierarchyPath.map(({ name, slug }) =>
      ({ name: name, slug: slug })),
    imageUrl:item.productDetails.productImages.mainImage.urlTemplate,
    brand:item.brandName,
    unit:item.basicQuantityUnit,
    comparisonPrice:item.comparisonPrice,
    comparisonUnit:item.comparisonUnit,
    quantityMultiplier:item.quantityMultiplier
  })
  const savedproducts = await product.save()
  // console.log(savedproducts)
  })
  res.status(200).send()
}
module.exports = {
  getProductById, addProducts, getProducts, getProductBySlug, getProductTest
}