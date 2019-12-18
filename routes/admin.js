const express = require('express');
const path = require('path');
const router = express.Router();
const rootDir = require('../utils/path');

// you can filter paths here by doing /admin/... or you can do it in the app.js file
router.get('/add-product', (req, res, next) => {
    console.log("Another middleware!");
    // send allows us to send an automatic html response.
    // res.send('<form action="/admin/add-product" method="POST"><input type="text" name="title"><button type="submit">Submit</button></form>');

    // sendFile allows us to send and serve html files
    res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
});

// get => only filter get requests
// post => only filter post request
// delete => delete requets only
// path => filter paths
// put => filters put 
router.post('//add-product', (req, res, next) => {
    console.log(req.body);
    res.redirect('/');
});

module.exports = router;