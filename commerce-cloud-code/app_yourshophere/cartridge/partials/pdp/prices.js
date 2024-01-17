exports.createModel = function createModel(options) {
    const StringUtils = require('dw/util/StringUtils');

    // @todo implement proper price logic
    const product = options.product.master ? options.product.variants[0] : options.product;

    const model = {
        price: StringUtils.formatMoney(product.priceModel.price),
    };

    return model;
};

exports.template = model => `${model.price}`;
