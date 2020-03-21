const fs = require('fs');
const path = require('path');
const rootDir = require('../utils/path');

const Cart = require('./cart');
// module.exports = function Product() {
// }

// const products = [];

const p = path.join(rootDir,
    'data',
    'products.json'
);

const getProductsFromFile = callBack => {
    fs.readFile(p, (e, data) => {
        if (e) {
            return callBack([]);
        } else {
            return callBack(JSON.parse(data));
        }
    });
};

module.exports = class Product {
    constructor(id, title, imageUrl, description, price) {
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    save() {
        getProductsFromFile(products => {
            if (this.id) {
                const existingProductIndex = products.findIndex(
                    product => product.id === this.id
                );
                const updatedProducts = [...products];
                updatedProducts[existingProductIndex] = this;
                fs.writeFile(p, JSON.stringify(updatedProducts), err => {
                    console.log(err);
                });
            } else {
                this.id = Math.random().toString();
                products.push(this);
                fs.writeFile(p, JSON.stringify(products), err => {
                    console.log(err);
                });
            }
        });
    }

    static deleteById(id) {
        getProductsFromFile(products => {
            const product = products.filter(p => p.id === id);
            const updatedProducts = products.filter(p => p.id !== id);
            fs.writeFile(p, JSON.stringify(updatedProducts), e => {
                if (!e) {
                    Cart.deleteProduct(id, product.price);
                }
            });
        });
    }
    // static allows to call directly on the class itself
    static fetchAll(callBack) {
        getProductsFromFile(callBack);
    }

    static findProductById(id, callBack) {
        getProductsFromFile(products => {
            const product = products.find(p => p.id === id)
            callBack(product);
        });
    }
};