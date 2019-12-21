const express = require('express');
// const path = require('path');
const router = express.Router();
// const rootDir = require('../utils/path');

const products = [];
// you can filter paths here by doing /admin/... or you can do it in the app.js file
router.get('/add-product', (req, res, next) => {
    console.log("Another middleware!");
    // send allows us to send an automatic html response.
    // res.send('<form action="/admin/add-product" method="POST"><input type="text" name="title"><button type="submit">Submit</button></form>');

    // sendFile allows us to send and serve html files
    // res.sendFile(path.join(rootDir, 'views', 'add-product.html'));

    // res.render('add-product', {
    //     pageTitle: 'Add Product',
    //     path: '/admin/add-product',
    //     activeAddProduct: true,
    //     productsCSS: true,
    //     formsCSS: true
    // });

    res.render('add-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product'
    });
});

// get => only filter get requests
// post => only filter post request
// delete => delete requets only
// path => filter paths
// put => filters put 
router.post('/add-product', (req, res, next) => {
    const { title } = req.body;
    products.push({ title: title })
    res.redirect('/');
});

exports.routes = router;
exports.products = products;
