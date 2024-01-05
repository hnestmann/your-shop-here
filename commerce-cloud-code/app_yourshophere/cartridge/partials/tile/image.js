/**
 * Create view model for a product image
 * 
 * @todo Add responsive images
 * @param {dw.catalog.Product} product 
 * @returns the view model
 */

exports.createModel = (product) => {
    return {
        largeUrl: product.getImages('large')[0].url,
        name: product.name,
        width: '300'
    };
}

exports.template = (model) => `<img loading="lazy" alt="${model.name}" src="${model.largeUrl}?sw=${model.width}" />`;