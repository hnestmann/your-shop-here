/**
 * Render search refinements
 * 
 * @returns 
 */
exports.createModel = () => {
    const HttpSearchParams = require('api/URLSearchParams');
    const model = {};
    const httpParams = new HttpSearchParams(request.httpParameterMap)
    const componentSettings = require('*/cartridge/utils/ComponentSettings').get(httpParams.get('component'));
    const search = require('api/ProductSearchModel').get(httpParams, {swatchAttribute: componentSettings.remoteSwatchableAttribute});
    search.search();
    
    model.componentId = httpParams.get('component');
    model.products = search.foundProducts;

    return model;
}

exports.template = (model) => `
    <div class="product-grid">
        ${model.products.map(hit => templateIncludeHit(hit, model.componentId)).join('')}
    </div>
`;

function templateIncludeHit(hit, componentId) {
    const url = hit.tileUrl;
    url.append('component', componentId)
    return `<wainclude url="${url}"/>`;
}