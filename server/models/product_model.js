const mongoose = require('mongoose')

const hierarchySchema = new mongoose.Schema({
  name:{
    type: String,
    required: true,
  },
  slug:{
    type: String,
    required: true,
  }
})

const productSchema = new mongoose.Schema({
  ean:{
    type: String,
    required: true,
  },
  name:{
    type: String,
    required: true,
  },
  slug:{
    type: String,
    required: true,
  },
  price:{
    type: mongoose.Schema.Types.Decimal128,
    required: true,
  },
  campaignPrice:{
    type: mongoose.Schema.Types.Decimal128,
    required: false,
  },
  isAgeLimitedByAlcohol:{
    type: Boolean,
    required: true,
  },
  isNewProduct:{
    type: Boolean,
    required: true,
  },
  frozen:{
    type: Boolean,
    required: true,
  },
  hierarchy:[hierarchySchema],
  imageUrl:{
    type: String,
    required: false,
  },
  brand:{
    type: String,
    required: false,
  },
  unit:{
    type: String,
    required: false
  },
  comparisonPrice:{
    type: mongoose.Schema.Types.Decimal128,
    required: false
  },
  comparisonUnit:{
    type: String,
    required: false
  },
  quantityMultiplier:{
    type: Number,
    required: false
  }
})

productSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})
module.exports = mongoose.model('products', productSchema)