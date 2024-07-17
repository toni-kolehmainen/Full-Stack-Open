const mongoose = require('mongoose')

const storeDatesSchema = new mongoose.Schema({
  date: {
    type: String,
    required: false
  },
  mode:{
    type: String,
    required: false,
  },
  open: {
    type: String,
    required: false,
  },
  close: {
    type: String,
    required: false,
  },
  exceptional: {
    type: String,
    required: false,
  },
  message: {
    type: String,
    required: false,
  }
})
const storeOpenningHoursSchema = new mongoose.Schema({
  week: {
    type: Number,
    required: false,
  },
  dates: [storeDatesSchema]
})

const coordinateSchema = new mongoose.Schema({
  latitude: {
    type: mongoose.Schema.Types.Decimal128,
    required: false,
  },
  longitude: {
    type: mongoose.Schema.Types.Decimal128,
    required: false,
  }
})

const storeLocationSchema = new mongoose.Schema({
  address: {
    type: String,
    required: true,
  },
  postcode: {
    type: String,
    required: true,
  },
  postcodeName: {
    type: String,
    required: true,
  },
  coordinates:coordinateSchema,
})

const storePrismaSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  location: storeLocationSchema, // changed single nested
  weeklyOpeningHours: [storeOpenningHoursSchema]
})

storePrismaSchema.set('toJSON', {
  virtuals: true,
  transform: (document, returnedObject) => {
    returnedObject.objectid = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('stores', storePrismaSchema)
