import express from 'express';

import { deleteUser, createUser} from '../controllers/user_controller.js';

const router = express.Router();

router.post('/deleteuser:id', deleteUser);
router.post('/createuser', createUser);


// router.post('/getproductinfo', getProductInfo);
// router.post('/getStoreInfo', getStoreInfo);