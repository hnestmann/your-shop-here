const ProductListMgr = require('dw/customer/ProductListMgr');
const ProductList = require('dw/customer/ProductList');
const Transaction = require('dw/system/Transaction');
const ProductMgr = require('dw/catalog/ProductMgr');

function Wishlist(wishlist) {
    const wrapper = require('*/cartridge/models/wrapper.js');

    wrapper('ProductList' ,this, wishlist);

    Object.defineProperty(this, 'items', {
        get: function () {
            return this.object.items.toArray();
        }
    });

    this.addItem = function (productId) {
        const apiProduct = ProductMgr.getProduct(productId);
        const wishlist =  this.object;
        Transaction.wrap(function () {
            wishlist.createProductItem(apiProduct);
        });
    };

    this.removeItem = function (productId) {
        const listItems = this.items;
        const wishlist =  this.object;
        var itemToRemove = null;
        listItems.forEach(function (item) {
            if (item.productID === productId) {
                itemToRemove = item;
            }
        });
        Transaction.wrap(function () {
            wishlist.removeItem(itemToRemove);
        });
    };

}

exports.modelClass = Wishlist;
exports.init = function (customer, type) {
    const productLists = ProductListMgr.getProductLists(customer, type);
    Transaction.wrap(function () {
        wishlist = productLists.length > 0
            ? productLists[0]
            : ProductListMgr.createProductList(customer, type);
    });
    return new Wishlist(wishlist);
};
