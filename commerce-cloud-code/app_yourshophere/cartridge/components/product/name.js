exports.createModel = (tileProduct) => {
    const URLUtils = require('dw/web/URLUtils');
    return {
        pdpUrl: URLUtils.url('Product-Show', 'pid', tileProduct.productID),
        pdpUrlHx: URLUtils.url('Product-Show', 'pid', tileProduct.productID).append('hx', 'main'),
        name: tileProduct.product.name
    };
}

exports.template = (model) => `<a href="${model.pdpUrl}" hx-push-url="${model.pdpUrl}" 
hx-get="${model.pdpUrlHx}" hx-target="main" hx-indicator=".progress">${model.name}</a>`;