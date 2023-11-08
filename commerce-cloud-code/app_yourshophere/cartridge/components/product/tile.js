const name = require('./name');
const image = require('./image');
const price = require('./price');

exports.createModel = (productHit) => {
    const product = productHit.product;

    const model = {};

    if(product) {
        model.name = name.createModel(product);
        model.image = image.createModel(product);
        model.price = price.createModel(product);
    }

    return model;
}

exports.template = (model) => `<article data-include-url="${request.httpQueryString}">

<!-- @todo promotions, real prices based on search including list prices 
var-groups, markup should be generated as template string in searchHit (or whatever);
maybe store image type and swatchable var attribute in a JSON filled by PD
-->
${name.template(model.name)}
${image.template(model.image)}
${price.template(model.price)}   
</article>`;