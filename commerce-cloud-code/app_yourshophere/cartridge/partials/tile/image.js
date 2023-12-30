/**
 * Create view model for a product image
 * 
 * @todo Add responsive images
 * @param {dw.catalog.Product} product 
 * @returns the view model
 */

exports.createModel = function createImageModel (hit, search, imageFilter, config) {
    let url;
    if (imageFilter) {
        url = function getFilteredImages() {
            var imagebleValue = search.getRepresentedVariationValues(imageFilter.key).filter((color) => color.value === imageFilter.value).pop();
            if (imagebleValue) {
                return imagebleValue.getImage(config.remoteImageViewType || 'large', 0).url;
            }
        }();
    }
    
    if (!url) {
       url = hit.product.getImages(config.remoteImageViewType || 'large')[0].url;
    }

    return {
        largeUrl: url,
        name: hit.name,
        width: '300'
    };
}

exports.template = (model) => `<img loading="lazy" alt="${model.name}" src="${model.largeUrl}?sw=${model.width}" />`;