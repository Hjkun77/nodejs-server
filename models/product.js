const fs = require('fs');
const path = require('path');
const rootDir = require('../utils/path');

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
    constructor(title) {
        this.title = title;
    }

    save() {
        // products.push(this);
        getProductsFromFile(products => {
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), (e) => {
                console.log(e);
            });
        });
    }

    // static allows to call directly on the class itself
    static fetchAll(callBack) {
        getProductsFromFile(callBack);
    }
};