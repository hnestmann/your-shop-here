const models = require('model');

/**
 * Render search refinements
 * 
 * @returns 
 */
exports.createModel = () => {
    const HttpSearchParams = require('api/URLSearchParams')
    const httpParams = new HttpSearchParams(request.httpParameterMap)

    const search = require('api/ProductSearchModel');
    search.init(httpParams);
    search.search();
    return search.foundProducts;
}

exports.template = (model) => `
    <div class="product-grid">
        ${model.map(hit => templateIncludeHit(hit)).join('')}
    </div>
`;

function templateIncludeHit(hit) {
    return `<wainclude url="${hit.url}"/>`;
}