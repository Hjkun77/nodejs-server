const express = require('express');
const path = require('path');
const router = express.Router();



router.get('/', (req, res, next) => {
    console.log("Another middleware!");
    // send allows us to send an automatic html response.
    // res.send('<h1>Hello from Express!</h1>');

    // sendFile allows us to send and serve html files
    res.sendFile(path.join(__dirname, '..', 'views', 'shop.html'));
});

module.exports = router;