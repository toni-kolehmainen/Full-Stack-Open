// const cors = require('cors')
// const express = require('express')
// const app = express()
const app = require('./app')
const config = require('./utils/config')
// const logger = require('./utils/middleware')
// const router = require('./routes/routes.js')

// const url =`mongodb+srv://fullstack:${password}@cluster0.o1opl.mongodb.net/noteApp?retryWrites=true&w=majority`

// Render or heroku
// atlas

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})