exports.createModel = (productId) => {
    return {
        salesPrice: StringUtils.formatMoney(new dw.value.Money(request.httpParameterMap.minPrice, 'EUR'))
    };
}

exports.template = (model) => `<div class="price">${model.salesPrice}</div>`;