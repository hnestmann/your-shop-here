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
<<<<<<< Updated upstream
    return search.foundProducts;
=======

    const componentId = httpParams.get('component');
    model.products = search.foundProducts.map((hit) => ({ tileUrl: hit.tileUrl.append('component', componentId) }));
    model.showMoreButton = (search.pagePosition + search.pageSize) < search.resultCount;
    // @todo makes only sense with proper page controls
    model.moreUrlFull = search.nextPageUrl('Search-Show').toString();
    model.moreUrlHx = search.nextPageUrl('Search-Grid');
    model.moreUrlHx = model.moreUrlHx.append('component', componentId);
    return model;
};

function templateIncludeHit(hit) {
    return `<wainclude url="${hit.tileUrl}"/>`;
}

function templateIncludeMore(model) {
    return `<div id="search-more">
        <a role="button" href="${model.moreUrlFull}"  hx-get="${model.moreUrlHx}" hx-target="#search-more" hx-swap="outerHTML">
            <!-- // @todo localization -->
            More
        </a>
    </div>`;
>>>>>>> Stashed changes
}

exports.template = (model) => `
    <div class="product-grid">
        ${model.map(hit => subTemplate(hit)).join('')}
    </div>
`;

function subTemplate(hit) {
    return `<wainclude url="${hit.url}"/>`;
}