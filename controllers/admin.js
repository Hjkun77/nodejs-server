const Product = require('../models/product');

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

    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing: false
    });
};

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    const product = new Product(null, title, imageUrl, description, price);
    product.save();
    res.redirect('/');
};

exports.getEditProduct = (req, res, next) => {
    // put query parameters in controllers
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect('/');
    }
    const productId = req.params.productId;
    Product.findProductById(productId, product => {
        if (!product) {
            return res.redirect('/');
        }
        res.render('admin/edit-product', {
            pageTitle: 'Edit Product',
            path: '/admin/edit-product',
            editing: editMode,
            product: product
        });
    })
};

exports.postEditProduct = (req, res, next) => {
    const productId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedImageUrl = req.body.imageUrl;
    const updatedDescription = req.body.description;
    const updatedProduct = new Product(productId, updatedTitle, updatedImageUrl, updatedDescription, updatedPrice);
    updatedProduct.save();
    res.redirect('/admin/products');
};

exports.getProducts = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('admin/products', {
            products: products,
            pageTitle: 'Admin Products',
            path: '/admin/products',
        });
    });
};

exports.postDeleteProduct = (req, res, next) => {
    const productId = req.body.productId;
    Product.deleteById(productId);
    res.redirect('/admin/products');
}