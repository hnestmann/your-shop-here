var HashMap = require('dw/util/HashMap');
var URLUtils = require('dw/web/URLUtils');

module.exports.get = function get(product) {
    var model = new HashMap();
    var productImage = null;
    model.url = URLUtils.url('Product-Show', 'pid', product.ID);
    var images = product.getImages('medium');

    if (!images && product.master && product.variationModel.variants.length > 0) {
        var variationProduct = product.variationModel.variants[0];
        images = variationProduct.getImages('medium');
    }
    if (images){
        var imageIterator = images.iterator();
        if (imageIterator && imageIterator.hasNext()) {
            productImage = imageIterator.next();
        }
    }

    model.text_headline = product.getName();
    if (productImage) {
        model.image = {
            src: productImage.getAbsURL(),
            alt: productImage.getAlt()
        };
    }

    model.isSet = product.productSet;
    model.productId = product.ID;

    var priceFactory = require('*/cartridge/scripts/factories/price');
    model.price = priceFactory.getPrice(product, null);


    var id = product.ID;
    var sum = id.split('').reduce(function (total, letter) {
        return total + letter.charCodeAt(0);
    }, 0);
    var rateVal = (Math.ceil(((sum % 3) + 2) + (((sum % 10) / 10) + 0.1)));
    model.rating = (rateVal < 5 ? rateVal + (((sum % 10) * 0.1) + 0.1) : rateVal);

    return model;
};
