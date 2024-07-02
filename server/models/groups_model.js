const { Double } = require('mongodb')
const mongoose = require('mongoose')

const groupsSchema = new mongoose.Schema({
  any: mongoose.Schema.Types.Mixed

})

groupsSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('product_groups', groupsSchema)
