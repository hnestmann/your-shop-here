'use strict';

const server = require('server');
const models = require('model');

const ProductList = require('dw/customer/ProductList');

server.get('HeaderIcon', (req, res, next) => {

    const wishlist = models.get('wishlist').init(customer, ProductList.TYPE_WISH_LIST);
    const products = wishlist.items.map((listItem) => listItem.productID);

    res.render('/header/wishlistIcon', {
        products: JSON.stringify(products),
        filledWishlistClass : products.length > 0 ? 'not-empty' : ''
    });
    next();
});

server.get('Event', (req, res, next) => {

    const productId = request.httpParameterMap.pid.submitted ? request.httpParameterMap.pid.stringValue : '';
    const event = request.httpParameterMap.event.submitted ? request.httpParameterMap.event.stringValue : '';

    const wishlist = models.get('wishlist').init(customer, ProductList.TYPE_WISH_LIST);

    if (event ==='add'){
        wishlist.addItem(productId);
    }
    if(event ==='remove'){
        wishlist.removeItem(productId);
    }

    res.render('/empty');
    next();
});

server.get('Show', server.middleware.https, function (req, res, next) {
    const wishlist = models.get('wishlist').init(customer, ProductList.TYPE_WISH_LIST);

    res.render('/wishlist/wishlistLanding', {
        wishlist: wishlist
    });
    next();
});



module.exports = server.exports();
