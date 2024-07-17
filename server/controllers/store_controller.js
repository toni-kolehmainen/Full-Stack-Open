const { restart } = require('nodemon')
const dataController = require('../models/store_model')
const { error } = require('../utils/logger')
const mongoose = require('mongoose')
const { writeFile, readFile } = require('fs');
const spawn = require('child_process').spawn;

/**
 * @param {Response} res The response
 * @param {Request} req The request
 */

// req gives stores that is filtered and the start and end amount
// mongoose finds brand (prisma, sale, s-market)
const getStores = (req, res, next) => {
  // check req body
  if (!req.body) {
    return res.status(400).json({ error: "Request has no body", status: 400 })
  }
  // check req body has brands
  if (!req.body.brand) {
    return res.status(400).json({ error: "Request has no brands", status: 400 })
  }

  let data = []
  const Store = dataController
  mongoose.connection
  mongoose.connection.readyState
  Store.find({
    $and: [
      { $or: req.body.brand },
      {
        $or: [
          { name: { "$regex": req.body.search, "$options": "i" } },
          { "location.postcodeName": { "$regex": req.body.search, "$options": "i" } }
        ]
      }
    ],
  }).populate("location").sort({ "id": -1 }).skip(req.body.skip).limit(req.body.limit)

    .then(result => {
      result.forEach(group => {
        data.push(group)
      })
      res.status(200).send(data)
    })
    .catch(err => {
      return res.status(500).json({ error: err, status: 500 })
    })
}
/**
 * @param {Response} res The response
 * @param {Request} req The request
 * Test id 708279138
 */
const getStoresById = async (req, res, next) => {
  // Check req body has id
  if (!req.body.id) {
    return res.status(400).json({ error: "Request body has no id", status: 400 })
  }

  const Store = dataController
  mongoose.connection
  mongoose.connection.readyState
  Store.findOne({ id: req.body.id })
    .then(result => {
      if (result) {
        res.status(200).json({ data: result, status: 200 })
      } else {
        res.status(400).json({ error: "No results found by id", status: 400 })
      }
    })
    .catch(err => {
      res.status(500).json({ error: err, status: 500 })
    })
}

// req gives stores that is filtered and the start and end amount
// mongoose finds brand (prisma, sale, s-market)
const getStoreByBrand = (req, res, next) => {
  // check req body 
  let data = []
  const Store = dataController
  mongoose.connection
  mongoose.connection.readyState
  Store.find({
    $or: [
      { brand: "WebUser" },
      { brand: "user" }
    ]
  }).sort({ 'id': -1 }).skip(req.body.limit).limit(req.body.skip)
    .then(result => {
      result.forEach(group => {
        data.push(group)
      })
      res.status(200).send(data)
    })
}
// check conditions
// validation
// mode RANGE, ALL_DAY

const addStores = async (req, res, next) => {
  // const path = './data/store_prisma.json';
  // const path = './data/store_sale.json';
  const path = './data/store_smarket.json';
  const Store = dataController
  readFile(path, 'utf8', async function (err, data) {
    if (err) throw err;
    obj = JSON.parse(data);
    await obj.store.map(async store => {
      const shop = new Store({
        id: store.id,
        slug: store.slug,
        name: store.name,
        brand: store.brand,
        location: {
          address: store.location.address.street.default,
          postcode: store.location.address.postcode,
          postcodeName: store.location.address.postcodeName.default,
          coordinates: {
            latitude: null,
            longitude: null,
          },
        },
        weeklyOpeningHours: {
          week: store.weeklyOpeningHours !== null ? store.weeklyOpeningHours[0].weekNumber : null,
          dates:
            store.weeklyOpeningHours !== null ?
              store.weeklyOpeningHours[0].openingTimes.map(({ date, exceptional, message, ranges, mode }) =>
                ({ date, open: ranges !== null ? ranges[0].open : null, close: ranges !== null ? ranges[0].close : null, exceptional, message, mode }))
              : null,
        },
      });
      const savedstore = await shop.save()
      // console.log(savedstore)
      // shop.save().then(result => {
      //   console.log('restaurant saved!')
      // })
    })
    res.status(200).end()
  });
}

const add_coordinates = (req, res, next) => {
  let data = []
  const Store = dataController
  mongoose.connection
  mongoose.connection.readyState
  // Store.find({ "location.coordinates.latitude": null }).populate("location.coordinates").sort({ 'id': -1 })
  Store.find({ "brand": "s-market" }).populate("location.coordinates").sort({ 'id': -1 }).limit(200).skip(400)
    .then(result => {
      result.forEach(group => {
        data.push(group)
      })
      return data
    }).
    then(stores => {
      // console.log(stores)
      const items = stores.map(({ location, _id }) =>
        ({ address: location.address, postcodeName: location.postcodeName, id: _id.toString() }))
      const args = JSON.stringify(items);
      const file = './external/get_coordinates.py'
      // console.log("here")
      try {
        const python = spawn('python', [file, args]);
        let result = "";
        python.stdout.on('data', (data) => {
          console.log("data")
          result += data.toString()
        });

        python.stdout.on("end", async function () {
          console.log("end")

          let updateValues = { data: result }
          let dataJson = JSON.parse(updateValues["data"]);
          console.log(dataJson)
          await dataJson.map(async (item) => {
            await Store.updateOne({ _id: item.id }, {
              "$set": {
                "location.coordinates.latitude": item.location.latitude,
                "location.coordinates.longitude": item.location.longitude
              }
            })
          })
          res.status(200).end();
        })
      } catch (e)  {
        return res.status(502).json({ message: e });
      }

    })
    .catch(err => {
      return res.status(500).json({ error: err, status: 500 })
    })

}

const helper = async (req, res, next) => {

  const Store = dataController
  mongoose.connection
  mongoose.connection.readyState
  await Store.updateOne({ _id: req.body.id }, {
    "$set": {
      "location.coordinates.latitude": req.body.latitude,
      "location.coordinates.longitude": req.body.longitude
    }
  })
  res.status(200).end()
}

module.exports = {
  getStoreByBrand, addStores, getStores, getStoresById, add_coordinates, helper
}