const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');

const product = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    // unique:true,
    ref:'products'
  },
  amount: {
    type: Number,
    required: true,
    min: 1
  }
})

const userCartSchema = new mongoose.Schema({
  uuid: {
    type: String,
    required: true,
    unique:true,
    dropDups: true
  },
  isSigned: {
    type: Boolean,
    required: true,
  },
  cart: [product]
})
// userCartSchema.path('cart').validate(function(v) {
//   return v.amount > 0;
// });
userCartSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.objectid = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('usercarts', userCartSchema)
