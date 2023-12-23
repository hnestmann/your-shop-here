const name = require('./name');
const image = require('./image');
const price = require('./price');
const swatches = require('./swatches');

exports.createModel = () => {

    const HttpSearchParams = require('api/URLSearchParams')
    const httpParams = new HttpSearchParams(request.httpParameterMap)

    const tileSearch = require('api/ProductSearchModel');
    tileSearch.init(httpParams);
    tileSearch.search();

    /** @type dw.catalog.Product */
    const product = tileSearch.foundProducts.pop().product;
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

exports.template = (model) => `
<article data-include-url="${request.httpQueryString}">
    <header>${name.template(model.name)}</header>
    <body>
        ${image.template(model.image)}
        ${swatches.template(model.swatches)}
        ${price.template(model.price)}
    </body>
    <footer><button>Add to cart</button></footer>
</article>`;