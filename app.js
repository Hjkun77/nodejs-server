const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
// const eHBS = require('express-handlebars');
const errorController = require('./controllers/error');

const app = express();

// engine lets you set a templating engine that is not built-in in express
// app.engine('handlebars', eHBS({ layoutsDir: 'views/handlebars/layouts', defaultLayout: 'main', extname: 'handlebars' }));

// allow to set global variables
// app.set('view engine', 'pug');
// app.set('view engine', 'handlebars');
app.set('view engine', 'ejs'); // note that ejs doesn't support layouts

// we want to compile the pug template engine in /views
// app.set('views', 'views/pug');
// app.set('views', 'views/handlebars');
app.set('views', 'views/ejs');

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
app.use(errorController.get404);

app.listen(3000);