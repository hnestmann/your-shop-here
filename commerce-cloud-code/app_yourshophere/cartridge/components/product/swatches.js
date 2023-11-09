/**
 * Render tile swatches
 * 
 * @param {dw.catalog.Product} product 
 * @param {dw.catalog.ProductVariationModel} variationModel 
 * @returns 
 */
exports.createModel = (product, variationModel) => {
    // var ProductVariationModel = require('dw/catalog/ProductVariationModel');
    const variationAttributes = variationModel.getProductVariationAttributes();
    const colorAttribute = variationAttributes.toArray().filter((attribute) => attribute.attributeID == 'yshColor').pop();
    const colorValues = variationModel.getAllValues(colorAttribute).toArray();

    return {
        swatches: colorValues.map((color) => { return {
            color: color.displayValue,
            url: variationModel.urlSelectVariationValue('Product-Show',colorAttribute,color),
            alt: color.displayValue,
            image: {
                url: variationModel.getImage('swatch',colorAttribute,color).url
            }
        }})
    };
}

exports.template = (model) => `<div class="swatches">${model.swatches.map((swatch) => 
    `<a href="${swatch.url}"><img src="${swatch.image.url}" alt="${swatch.alt}" /></a>`
).join('')}</div>`;