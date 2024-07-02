const dataController = require('../controllers/store_controller')
const router = require('express').Router()

router.get('/gettest', dataController.getTest);

// dataController.
// router.post('/createuser', dataController.createUser);

// router.get('/api/gettest', (request, response) => {
//   response.json(notes)
// })
router.post('/createmongo', dataController.createMongo);

router.get('/getgroups', dataController.getGroups);

// router.get('/getmongo', (request, response) => {
//   response.json(notes)
// })

// router.get('/', dataController.getdefault);

module.exports = router