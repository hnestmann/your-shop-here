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
    model.showMoreButton = (search.pagePosition + search.pageSize) < search.resultCount;
    // @todo makes only sense with proper page controls
    model.moreUrlFull = search.nextPageUrl('Search-Show').toString();
    model.moreUrlHx = search.nextPageUrl('Search-Grid');
    model.moreUrlHx = model.moreUrlHx.append('component', model.componentId);
    return model;
}

exports.template = (model) => `
    <div class="product-grid">
        ${model.products.map(hit => templateIncludeHit(hit, model.componentId)).join('')}
    </div>
    ${model.showMoreButton ? templateIncludeMore(model) : ''}
`;

function templateIncludeHit(hit, componentId) {
    const url = hit.tileUrl;
    url.append('component', componentId)
    return `<wainclude url="${url}"/>`;
}

function templateIncludeMore(model) {
    return `<div id="search-more">
        <a role="button" href="${model.moreUrlFull}"  hx-get="${model.moreUrlHx}" hx-target="#search-more" hx-swap="outerHTML">
            <!-- // @todo localization -->
            More
        </a>
    </div>`;
}