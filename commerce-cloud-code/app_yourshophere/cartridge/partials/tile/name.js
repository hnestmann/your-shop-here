exports.createModel = (hit) => {
    const URLUtils = require('dw/web/URLUtils');
    return {
        pdpUrl: URLUtils.url('Product-Show', 'pid', hit.productId),
        pdpUrlHx: URLUtils.url('Product-Show', 'pid', hit.productId).append('hx', 'main'),
        name: hit.name
    };
};

exports.template = (model) => `<a href="${model.pdpUrl}" hx-push-url="${model.pdpUrl}" 
hx-get="${model.pdpUrlHx}" hx-target="main" hx-indicator=".progress">${model.name}</a>`;
