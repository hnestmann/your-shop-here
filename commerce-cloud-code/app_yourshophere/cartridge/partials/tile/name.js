exports.createModel = (product) => {
    const URLUtils = require('dw/web/URLUtils');
    return {
        pdpUrl: URLUtils.url('Product-Show', 'pid', product.ID),
        pdpUrlHx: URLUtils.url('Product-Show', 'pid', product.ID).append('hx', 'main'),
        name: product.name
    };
}

exports.template = (model) => `<a href="${model.pdpUrl}" hx-push-url="${model.pdpUrl}" 
hx-get="${model.pdpUrlHx}" hx-target="main" hx-indicator=".progress">${model.name}</a>`;