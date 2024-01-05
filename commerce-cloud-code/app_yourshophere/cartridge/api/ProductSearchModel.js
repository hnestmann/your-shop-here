const ProductSearchModel = require('dw/catalog/ProductSearchModel');
const ArrayList = require('dw/util/ArrayList');
const PagingModel = require('dw/web/PagingModel');
const models = require('model');

let paging;
let instance;

let pageStart = 0;
let pageSize = 12;

exports.init = function init(httpParams) {
    const wrapper = require('*/cartridge/models/wrapper.js');
    instance = new ProductSearchModel();

    const cgid = httpParams.get('cgid');
    if (cgid) {
        instance.setCategoryID(cgid);
    }

    const productId = httpParams.get('pid');
    if (productId) {
        var productIds = new ArrayList();
        productIds.add1(productId);
        instance.setProductIDs(productIds);
    }

    const minPrice = httpParams.get('pmin');
    if (minPrice) {
        instance.setPriceMin(new Number(minPrice));
    }

    const maxPrice = httpParams.get('pmax');
    if (maxPrice) {
        instance.setPriceMax(new Number(maxPrice));
    }

    const promotionId = httpParams.get('pmid');
    if (promotionId) {
        instance.setPromotionID(promotionId);
    }

    const query = httpParams.get('q');
    if (query) {
        instance.setSearchPhrase(query);
    }

    const startParam = httpParams.get('start')
    if (startParam) {
        pageStart = new Number(startParam);
    }

    const sizeParam = httpParams.get('sz')
    if (sizeParam) {
        pageSize = new Number(sizeParam);
    }


    httpParams.forEach((value, key) => {
        if (key.includes('prefn')) {
            instance.addRefinementValues(key, httpParams.get(key.replace('prefn', 'prefv')));
        }
    });
}

exports.search = function search() {

    const searchStatus = instance.search();
    var productPagingModel = new PagingModel(instance.productSearchHits, instance.count);
    productPagingModel.setStart(pageStart);
    productPagingModel.setPageSize(pageSize);
    paging = productPagingModel;

    return searchStatus;
}

exports.getCategory = function getCategory() {
    return instance.getCategory();
}

exports.getRefinements = function getRefinements() {
    return instance.getRefinements();
}

exports.isRefinedByCategory = function isRefinedByCategory() {
    return instance.isRefinedByCategory();
}

exports.canRelax = function canRelax() {
    return instance.canRelax();
}

exports.urlRelaxCategory = function urlRelaxCategory() {
    return instance.urlRelaxCategory();
}

exports.urlRefineCategory = function urlRefineCategory() {
    return instance.urlRefineCategory.apply(instance, arguments);
}

exports.isRefinedByPriceRange = function isRefinedByPriceRange() {
    return instance.isRefinedByPriceRange.apply(instance, arguments);
}

exports.urlRelaxPrice = function urlRelaxPrice() {
    return instance.urlRelaxPrice.apply(instance, arguments);
}

exports.urlRefinePrice = function urlRefinePrice() {
    return instance.urlRefinePrice.apply(instance, arguments);
}

exports.urlRefinePromotion = function urlRefinePromotion() {
    return instance.urlRefinePromotion.apply(instance, arguments);
}

exports.isRefinedByAttributeValue = function isRefinedByAttributeValue() {
    return instance.isRefinedByAttributeValue.apply(instance, arguments);
}

exports.urlRelaxAttributeValue = function urlRelaxAttributeValue() {
    return instance.urlRelaxAttributeValue.apply(instance, arguments);
}

exports.urlRefineAttributeValue = function urlRefineAttributeValue() {
    return instance.urlRefineAttributeValue.apply(instance, arguments);
}


let _viewResults;
Object.defineProperty(exports, 'foundProducts', {
    get: function () {
        if (!_viewResults) {
            _viewResults = paging.pageElements.asList().toArray().map(hit => models.get('searchHit').init(hit));
        }
        var myResult = _viewResults;
        return _viewResults;
    }
});
