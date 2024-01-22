exports.createModel = function createModel(options) {
    const variationModel = require('./variationAttributes').getVariationModel(options.product);

    const model = {
        images: variationModel.getImages(options.settings.viewType).toArray()
            .slice(0, options.settings.imageCount).map(image => ({
                url: image.url,
                alt: image.alt,
            })),
    };
    return model;
};

exports.template = model => model.images.map(image => `<img src="${image.url}" alt="${image.alt}" />`).join('\n');
