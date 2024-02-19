import router from './routes/routes.js';
const cors = require('cors')
const express = require('express')
const app = express()

// Render or heroku
// atlas
// toni
// 83Uq0f5f8Ejbj80U
let notes = []

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (request, response) => {
  response.json(notes)
})

app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(cors());

app.use((_, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});
// const unknownEndpoint = (request, response) => {
//   response.status(404).send({ error: 'unknown endpoint' })
// }

// app.use(unknownEndpoint)
app.use(router);

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})