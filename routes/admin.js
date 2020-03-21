const express = require('express');
// const path = require('path');
const router = express.Router();
// const rootDir = require('../utils/path');

const adminController = require('../controllers/admin');

// you can filter paths here by doing /admin/... or you can do it in the app.js file
// /admin/add-product => GET
router.get('/add-product', adminController.getAddProduct);

// get => only filter get requests
// post => only filter post request
// delete => delete requets only
// path => filter paths
// put => filters put 
// /admin/add-product => POST
router.post('/add-product', adminController.postAddProduct);

router.get('/edit-product/:productId', adminController.getEditProduct);
router.post('/edit-product', adminController.postEditProduct);

// /admin/products => GET
router.get('/products', adminController.getProducts);

router.post('/delete-product', adminController.postDeleteProduct);

module.exports = router;
// exports.routes = router;
// exports.products = products;
