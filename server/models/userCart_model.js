const mongoose = require('mongoose')

const product = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  // amount: {
  //   type: Number,
  //   required: true
  // }
})

const userCartSchema = new mongoose.Schema({
  uuid: {
    type: String,
    required: true,
    unique:true
  },
  isSigned: {
    type: Boolean,
    required: true,
  },
  products: [product]
})

userCartSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.objectid = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('usercarts', userCartSchema)
