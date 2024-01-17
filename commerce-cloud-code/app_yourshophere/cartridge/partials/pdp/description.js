exports.createModel = function createModel(options) {
    const product = options.product;
    const model = {
        descriptionTitle: options.settings.descriptionTitle,
        description: (options.settings.shortOrLongDescription === 'Short_Description') ? product.shortDescription : product.longDescription,
        divExpandedOrCompress: options.settings.divExpandedOrCompress,

    };

    return model;
};

exports.template = model => `${model.descriptionTitle ? `<h2>${model.descriptionTitle}</h2>` : ''}
<div class="description">${model.description}</div>`;
