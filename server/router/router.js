const dataController = require('../controllers/restaurant_controller')
const router = require('express').Router()
// const Note = require('../models/note')

router.get('/gettest', dataController.getTest);

// dataController.
// router.post('/createuser', dataController.createUser);

// router.get('/api/gettest', (request, response) => {
//   response.json(notes)
// })
router.post('/createmongo', dataController.createMongo);

router.get('/getmongo', dataController.getMongo);

// router.get('/getmongo', (request, response) => {
//   response.json(notes)
// })

router.get('/', dataController.getdefault);



// router.get('/', (request, response) => {
//   response.send('<h1>Hello World!</h1>')
// })

module.exports = router