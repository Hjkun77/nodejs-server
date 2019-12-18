const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    console.log("In the middleware!");
    next(); // allows the request to continue to the next middleware in line
});

// outsourced routes
app.use('/admin', adminRoutes);
app.use(shopRoutes);

// to have a 404 page
app.use((req, res, next) => {
    // res.status(404).send('<h1>Page not found</h1>');
    res.status(404).sendFile(path.join(__dirname, '.', 'views', '404.html'))
})

app.listen(3000);