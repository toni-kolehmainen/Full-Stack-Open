const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  email:{
    type: String,
    required: true,
    minlength: 5,
    maxlength: 30,
  },
  password:{
    type: String,
    required: true,
  },
  // token:{
  //   type: String,
  // }
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})
module.exports = mongoose.model('users', userSchema)