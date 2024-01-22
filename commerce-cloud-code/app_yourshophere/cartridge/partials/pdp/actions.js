exports.createModel = function createModel(options) {
    const URLUtils = require('dw/web/URLUtils');

    const model = {
        regionHtml: options.regions.actions.render(),
        url: URLUtils.url('Product-Show', 'pid', options.product.ID),
    };

    return model;
};

exports.template = model => `<form name="pdp-actions" action="${model.url}">${model.regionHtml}</form>`;
