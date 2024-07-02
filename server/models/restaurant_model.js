// const { Double } = require('mongodb')
// const mongoose = require('mongoose')

//  drive, 

// const noteSchema = new mongoose.Schema({
//   content: {
//     type: String,
//     required: true,
//     minlength: 5
//   },
//   important: Boolean,
// })
// name, latitude, longitude, link, drivein, Take away
// const restaurantSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   address: {
//     type: String,
//     required: true,
//   },
//   link: {
//     type: String,
//     required:false
//   },
//   takeaway: Boolean,
//   drivein:Boolean,
// })

// restaurantSchema.set('toJSON', {
//   transform: (document, returnedObject) => {
//     returnedObject.id = returnedObject._id.toString()
//     delete returnedObject._id
//     delete returnedObject.__v
//   }
// })

// module.exports = mongoose.model('Restaurants', restaurantSchema)
