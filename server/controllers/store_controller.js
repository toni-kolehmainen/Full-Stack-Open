const { restart } = require('nodemon')
const config = require('../utils/config')
const dataController = require('../models/store_model')
const { error } = require('../utils/logger')
const mongoose = require('mongoose')
const { writeFile, readFile } = require('fs');
const { stores } = require('../external/setup')
const { time } = require('console')
/**
 * @param {Response} res The response
 * @param {Request} req The request
 */

// req gives stores that is filtered and the start and end amount
// mongoose finds brand (prisma, sale, s-market)
const getStoreByBrand = (req, res, next) => {
  // check req body 
  let data = []
  const Store = dataController
  mongoose.connection
  mongoose.connection.readyState
  Store.find({brand:req.body.brand}).sort({ 'id': -1 }).skip(req.body.limit).limit(req.body.skip).then(result => {
    result.forEach(group => {
      data.push(group)
    })
    res.status(200).send(data)
  })
}
// check conditions
// validation
const addStores = async (req, res, next) => {
  // const path = './data/store_prisma.json';
  // const path = './data/store_sale.json';
  const path = './data/store_smarket.json';
  const Store = dataController
  readFile(path, 'utf8', function (err, data) {
    if (err) throw err;
    obj = JSON.parse(data);
    obj.store.map(async store => {
    const shop = new Store({
      id: store.id,
      slug: store.slug,
      name: store.name,
      brand: store.brand,
      location: {
        address: store.location.address.street.default,
        postcode: store.location.address.postcode,
        postcodeName: store.location.address.postcodeName.default,
      },
      weeklyOpeningHours: {
        week: store.weeklyOpeningHours !== null ? store.weeklyOpeningHours[0].weekNumber : null,
        dates:
          store.weeklyOpeningHours !== null ?
            store.weeklyOpeningHours[0].openingTimes.map(({ date, exceptional, message, ranges  }) =>
              ({ date: date, open:ranges !== null ? ranges[0].open : null, close:ranges !== null ? ranges[0].close : null, exceptional: exceptional, message: message }))
            : null,
      },
    });
    const savedstore = await shop.save()
    console.log(savedstore)
    // shop.save().then(result => {
    //   console.log('restaurant saved!')
    // })
  })
});
}
module.exports = {
  getStoreByBrand, addStores
}