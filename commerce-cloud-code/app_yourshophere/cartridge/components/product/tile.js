const name = require('./name');
const image = require('./image');
const price = require('./price');
const swatches = require('./swatches');

exports.createModel = (productHit) => {
    const product /** @type dw.catalog.Product */ = productHit.product;
    const variationModel = product.variationModel;

    const model = {};

    if(product) {
        model.name = name.createModel(product);
        model.image = image.createModel(product);
        model.price = price.createModel(product);
        model.swatches = swatches.createModel(product,variationModel);
    }

    return model;
}

exports.template = (model) => `<article data-include-url="${request.httpQueryString}">

<!-- @todo promotions, real prices based on search including list prices 
var-groups;
maybe store image type and swatchable var attribute in a JSON filled by PD
-->
    <header>${name.template(model.name)}</header>
    <body>
        ${image.template(model.image)}
        ${swatches.template(model.swatches)}
        ${price.template(model.price)}
    </body>
    <footer><button>Add to cart</button></footer>
</article>`;