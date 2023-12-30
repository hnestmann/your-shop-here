const name = require('./name');
const image = require('./image');
const price = require('./price');
const swatches = require('./swatches');

exports.createModel = () => {
    const HttpSearchParams = require('api/URLSearchParams')
    const httpParams = new HttpSearchParams(request.httpParameterMap)
    const componentSettings = require('*/cartridge/utils/ComponentSettings').get(httpParams.get('component'));

    const tileSearch = require('api/ProductSearchModel').get(httpParams, {swatchAttribute: componentSettings.remoteSwatchableAttribute});
    tileSearch.search();

    const imageFilter = {
        key: componentSettings.remoteSwatchableAttribute, 
        value: httpParams.get('color')
    };

    const hit = tileSearch.foundProducts[0];
    const model = {};

    if(hit) {
        model.name = name.createModel(hit);
        model.image = image.createModel(hit, tileSearch, imageFilter,{imageViewType: componentSettings.remoteImageViewType});
        model.price = price.createModel(hit, tileSearch, httpParams);
        model.swatches = swatches.createModel(hit, tileSearch, {swatchAttribute: componentSettings.remoteSwatchableAttribute});
    }

    return model;
}

exports.template = (model) => `
<article data-include-url="${request.httpQueryString}">
    <header>${name.template(model.name)}</header>
    <body>
        ${image.template(model.image)}
        ${price.template(model.price)}
        ${swatches.template(model.swatches)}
    </body>
    <footer><button>Add to cart</button></footer>
</article>`;