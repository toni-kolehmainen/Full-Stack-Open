const { Double } = require('mongodb')
const mongoose = require('mongoose')

const storeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
})

storeSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('tests', storeSchema)
