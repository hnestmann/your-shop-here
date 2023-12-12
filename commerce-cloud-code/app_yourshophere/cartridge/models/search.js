const ProductSearchModel = require('dw/catalog/ProductSearchModel');
const PagingModel = require('dw/web/PagingModel');
const ArrayList = require('dw/util/ArrayList')
const models = require('model');

function ProductSearch(searchRequest) {
    const wrapper = require('*/cartridge/models/wrapper.js');
    const apiProductSearch = new ProductSearchModel();
    const params = request.httpParameterMap;
    wrapper('ProductSearchModel' ,this, apiProductSearch);
    if (searchRequest.cgid) {
        apiProductSearch.setCategoryID(searchRequest.cgid);
    }
    if (searchRequest.productId) {
        var productIDs = new ArrayList();
        productIDs.add1(searchRequest.productId);
        apiProductSearch.setProductIDs(productIDs);
    }
    if (params.pmin.submitted) {
        apiProductSearch.setPriceMin(params.pmin.doubleValue);
    }
    if (params.pmax.submitted) {
        apiProductSearch.setPriceMax(params.pmax.doubleValue);
    }
    params.getParameterMap('prefn').getParameterNames().toArray().forEach((index => {
        apiProductSearch.addRefinementValues(params[`prefn${index}`].stringValue,params[`prefv${index}`].stringValue);
    }))

    // @todo add price refinements etc
    

    this.search = function () {
        this.object.search();
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