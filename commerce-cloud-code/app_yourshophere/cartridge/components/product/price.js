exports.createModel = (product) => {
    var StringUtils = require('dw/util/StringUtils');
    return {
        salesPrice: StringUtils.formatMoney(new dw.value.Money(request.httpParameterMap.minPrice, 'EUR'))
    };
}

exports.template = (model) => `<div class="price">${model.salesPrice}</div>`;