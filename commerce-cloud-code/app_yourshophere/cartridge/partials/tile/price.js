/**
 * Create view model for a product price
 * 
 * @todo Add proper price calculation and strike price
 * @param {dw.catalog.Product} product 
 * @returns the view model
 */
exports.createModel = (product) => {
    var StringUtils = require('dw/util/StringUtils');
    return {
        salesPrice: StringUtils.formatMoney(new dw.value.Money(request.httpParameterMap.minPrice, 'EUR'))
    };
}

exports.template = (model) => `<div class="price">${model.salesPrice}</div>`;