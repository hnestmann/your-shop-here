const name = require('./name');
const image = require('./image');
const price = require('./price');
const swatches = require('./swatches');
const hookMgr = require('*/cartridge/utils/hookMgr');

exports.createModel = (productHit) => {
    const product /** @type dw.catalog.Product */ = productHit.product;
    const variationModel = product.variationModel;

    const model = {};

    if(product) {
        model.name = name.createModel(product);
        model.image = image.createModel(product);
        model.price = price.createModel(product);
        model.swatches = swatches.createModel(product,variationModel);
        model.productId = product.ID;
    }

    return model;
}

exports.template = (model) => `
<article data-include-url="${request.httpQueryString}">
    <header>
        ${name.template(model.name)} 
        ${hookMgr.callHook('wishlist.template', 'productIcon', model.productId)}
    </header>
    <body>
        ${image.template(model.image)}
        ${swatches.template(model.swatches)}
        ${price.template(model.price)}
    </body>
    <footer><button>Add to cart</button></footer>
</article>`;