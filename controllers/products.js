const products = [];

exports.getAddProduct = (req, res, next) => {
    // console.log("Another middleware!");
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
        path: '/admin/add-product',
        formsCss: true,
        productCSS: true,
        activeAddProduct: true
    });
};

exports.postAddProduct = (req, res, next) => {
    const { title } = req.body;
    products.push({ title: title });
    res.redirect('/');
};

exports.getProducts = (req, res, next) => {
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
}