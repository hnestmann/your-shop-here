exports.createModel = function createModel (hit, search, config) {
    const colorValues = search.getRepresentedVariationValues(config.swatchAttribute);
    // nothing to select
    if (colorValues.length < 2) {
        return {swatches: []};
    }

    const URLUtils = require('dw/web/URLUtils');
    return {
        swatches: colorValues.map((color) => { return {
            color: color.displayValue,
            // ideally we shouldnt manually create the dwvar_ parameter, but the variation model apis require too much overhead for a tile
            url: URLUtils.url('Product-Show','pid', hit.mainProductId, `dwvar_${hit.mainProductId}_${config.swatchAttribute}`, color.value),
            alt: color.displayValue,
            image: {
                url: color.getImage('swatch', 0).url
            }
        }})
    };
}

exports.template = function template (model) {
    return `<div class="swatches">${model.swatches.map((swatch) => 
    `<a href="${swatch.url}"><img src="${swatch.image.url}" alt="${swatch.alt}" /></a>`
).join('')}</div>`;}