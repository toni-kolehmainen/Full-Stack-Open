const { Double } = require('mongodb')
const mongoose = require('mongoose')

const storeDatesSchema = new mongoose.Schema({
  date:{
    type: String,
    required: false
  },
  open:{
    type: String,
    required: false,
  },
  close:{
    type: String,
    required: false,
  }, 
  exceptional:{
    type: String,
    required: false,
  },
  message:{
    type: String,
    required: false,
  }
})
const storeOpenningHoursSchema = new mongoose.Schema({
  week:{
    type: Number,
    required: false,
  },
  dates:[storeDatesSchema]
})
const storeLocationSchema = new mongoose.Schema({
  address:{
    type: String,
    required: true,
  },
  postcode:{
    type: String,
    required: true,
  },
  postcodeName:{
    type: String,
    required: true,
  }
})

const storePrismaSchema = new mongoose.Schema({
  id:{
    type: String,
    required: true,
  },
  slug:{
    type: String,
    required: true,
  },
  name:{
    type: String,
    required: true,
  },
  brand:{
    type: String,
    required: true,
  },
  location:[storeLocationSchema],
  weeklyOpeningHours:[storeOpenningHoursSchema]
})

storePrismaSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('stores', storePrismaSchema)
