const ProductSearchModel = require('dw/catalog/ProductSearchModel');
const PagingModel = require('dw/web/PagingModel');
const models = require('model');

function ProductSearch(parameterMap) {
    const wrapper = require('*/cartridge/models/wrapper.js');
    const apiProductSearch = new ProductSearchModel();
    wrapper(this, apiProductSearch);

    this.search = function () {
        this.object.search();
        const params = request.httpParameterMap;
        var productPagingModel = new PagingModel(this.object.productSearchHits, this.object.count);
        if (params.start.submitted) {
            productPagingModel.setStart(params.start.intValue);
        }

        if (params.sz.submitted && request.httpParameterMap.sz.intValue <= 60) {
            productPagingModel.setPageSize(params.sz.intValue);
        } else {
            productPagingModel.setPageSize(12);
        }
        this.paging = productPagingModel;
    };

    apiProductSearch.setCategoryID(parameterMap.cgid.stringValue);
    // @todo add refinements


    Object.defineProperty(this, 'foundProducts', {
        get: function () {

            if (!this._viewResults) {
                this._viewResults = this.paging.pageElements.asList().toArray().map(hit => models.get('searchHit').init(hit));
            }
            return this._viewResults;
        }
    });
}

exports.modelClass = ProductSearch;
exports.init = function (parameterMap) {
    return new ProductSearch(parameterMap);
};