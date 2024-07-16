const dataController = require('../controllers/group_controller')
const storeController = require('../controllers/store_controller')
const productController = require('../controllers/product')
const userController = require('../controllers/user')
const router = require('express').Router()

router.get('/gettest', dataController.getTest);
router.post('/signin', userController.SignIn);
router.post('/signup', userController.createUser);

router.post('/createmongo', dataController.createMongo);

router.get('/getgroups', dataController.getGroups);
router.post('/getbybrand', storeController.getStoreByBrand);
router.get('/addstores', storeController.addStores);
router.post('/getstores', storeController.getStores);
router.post('/getstorebyid', storeController.getStoresById);

router.get('/getproductstest', productController.getProductTest);
router.get('/addproducts', productController.addProducts);
router.get('/getproducts', productController.getProducts);
router.get('/getproductbyid', productController.getProductById);
router.get('/getproductbyslug', productController.getProductBySlug);

module.exports = router