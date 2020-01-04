const express = require('express');
// const path = require('path');
const router = express.Router();
// const rootDir = require('../utils/path');

const productsController = require('../controllers/products');

// you can filter paths here by doing /admin/... or you can do it in the app.js file
router.get('/add-product', productsController.getAddProduct);

// get => only filter get requests
// post => only filter post request
// delete => delete requets only
// path => filter paths
// put => filters put 
router.post('/add-product', productsController.postAddProduct);

module.exports = router;
// exports.routes = router;
// exports.products = products;
