const Product = require('../models/product');
const Cart = require('../models/cart');

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

    const products = Product.fetchAll(
        products => {
            res.render('shop/product-list', {
                products: products,
                pageTitle: 'All Products',
                path: '/products'
            });
        });
};

exports.getProductDetails = (req, res, next) => {
    const productId = req.params.productId;
    Product.findProductById(productId, product => {
        res.render('shop/product-detail', {
            product: product,
            pageTitle: product.title,
            path: '/products'
        });
    });

};


exports.getShop = (req, res, next) => {
    res.render('shop/', {
        pageTitle: 'Shop',
        path: '/'
    });
};

exports.getCart = (req, res, next) => {
    Cart.getCart(cart => {
        Product.fetchAll(products => {
            const cartProducts = [];
            for (product of products) {
                const cartProductData = cart.products.find(
                    prod => prod.id === product.id
                );
                if (cartProductData) {
                    cartProducts.push({ productData: product, qty: cartProductData.qty });
                }
            }
            res.render('shop/cart', {
                path: '/cart',
                pageTitle: 'Your Cart',
                products: cartProducts
            });
        });
    });
};

exports.postCart = (req, res, next) => {
    const productId = req.body.productId;
    Product.findProductById(productId, product => {
        Cart.addProduct(productId, product.price);
    });
    res.redirect('/cart');
};

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        pageTitle: 'Checkout',
        path: '/checkout'
    });
};

exports.getOrders = (req, res, next) => {
    res.render('shop/orders', {
        pageTitle: 'Your Orders',
        path: '/orders'
    });
};
