const express = require('express');
const path = require('path');
const router = express.Router();
const adminData = require('./admin');

router.get('/', (req, res, next) => {
    const products = adminData.products;
    // send allows us to send an automatic html response.
    // res.send('<h1>Hello from Express!</h1>');

    // sendFile allows us to send and serve html files
    // res.sendFile(path.join(__dirname, '..', 'views', 'shop.html'));

    // render is used for the default templating engine
    // res.render('shop', { products: products, pageTitle: 'Shop', path: '/' });

    // you need to add hasProducts to pass data to the .handlebars file
    // res.render('shop', {
    //     products: products,
    //     pageTitle: 'Shop',
    //     path: '/',
    //     hasProducts: products.length > 0,
    //     activeShop: true,
    //     productsCSS: true
    // });

    res.render('shop', {
        products: products,
        pageTitle: 'Shop',
        path: '/'
    });
});

module.exports = router;