const dataController = require('../controllers/group_controller')
const storeController = require('../controllers/store_controller')
const productController = require('../controllers/product')
const userController = require('../controllers/user')
const userCartController = require('../controllers/user/cart/index')
const router = require('express').Router()

router.get('/gettest', dataController.getTest);
router.post('/signin', userController.SignIn);
router.post('/signup', userController.createUser);

router.post('/createmongo', dataController.createMongo);

router.get('/getgroups', dataController.getGroups);
router.post('/getbybrand', storeController.getStoreByBrand);
router.get('/addstores', storeController.addStores);
router.get('/updatecoordinates', storeController.add_coordinates);
router.post('/getstores', storeController.getStores);
router.post('/getstorebyid', storeController.getStoresById);

router.post('/helper', storeController.helper);

router.get('/getproductstest', productController.getProductTest);
router.get('/addproducts', productController.addProducts);
router.get('/getproducts', productController.getProducts);
router.get('/getproductbyid', productController.getProductById);
router.get('/products/:slug/:slug1?/:slug2?', productController.getProductBySlug);
router.post('/productsearch/:search', productController.search);

router.get('/usercart', userCartController.getCart);
router.get('/createcart', userCartController.createCart);
router.get('/producttocart', userCartController.productToCart);


module.exports = router