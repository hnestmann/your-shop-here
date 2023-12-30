const ApiProductSearchModel = require('dw/catalog/ProductSearchModel');
const ArrayList = require('dw/util/ArrayList');
const PagingModel = require('dw/web/PagingModel');

exports.get = function initProductSearchModel(httpParams, config) {
    return new ProductSearchModel(httpParams, config)
}

function ProductSearchModel(httpParams, config) {
    const instance = new ApiProductSearchModel();
    this.pageStart = 0;
    this.pageSize = 24;
    this.swatchAttribute = 'yshColor';
    this.representedVariationValuesAccessCache = {};

    if (config && config.swatchAttribute) {
        this.swatchAttribute = config.swatchAttribute;
    }

    const cgid = httpParams.get('cgid');
    if (cgid) {
        instance.setCategoryID(cgid);
    }

    const productId = httpParams.get('pid');
    if (productId) {
        instance.addRefinementValues('ID', productId);
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
        this.pageStart = new Number(startParam);
    }

    const sizeParam = httpParams.get('sz')
    if (sizeParam) {
        this.pageSize = new Number(sizeParam);
    }

    if (request.httpQueryString.includes('pref')) {
        httpParams.forEach((value, key) => {
            if (key.includes('prefn')) {
                instance.addRefinementValues(key, httpParams.get(key.replace('prefn', 'prefv')));
            }
        });
    }

    Object.defineProperty(this, 'foundProducts', {
        get: function initSearchHits () {
            if (!this._viewResults) {
                const ProductSearchHit = require('api/ProductSearchHit');
                var productPagingModel = new PagingModel(this.object.productSearchHits, this.object.count);
                productPagingModel.setStart(this.pageStart);
                productPagingModel.setPageSize(this.pageSize);
                paging = productPagingModel;

                this._viewResults = paging.pageElements.asList().toArray().map(hit => ProductSearchHit.get(hit, {swatchAttribute: swatchAttribute}));
            }
            return this._viewResults;
        }
    });

    Object.defineProperty(this, 'minPrice', {
        get: function getMinPrice () {
            if (!this._minPrice) {
                if (this.object.count <= this.pageSize) {
                    const minPrices = this.foundProducts.map(hit => hit.minPrice.value);
                    this._minPrice = Math.min.apply(Math, minPrices)
                } else {
                    throw new Error('too many colors');
                }
            }
            return this._minPrice;
        }
    });

    Object.defineProperty(this, 'maxPrice', {
        get: function getMaxPrice () {
            if (!this._maxPrice) {
                if (this.object.count <= this.pageSize) {
                    const maxPrices = this.foundProducts.map(hit => hit.maxPrice.value);
                    this._maxPrice = Math.max.apply(Math, maxPrices)
                } else {
                    throw new Error('too many colors');
                }
            }
            return this._maxPrice;
        }
    });

    this.object = instance;
}

ProductSearchModel.prototype.search = function search() {
    return this.object.search();
}

ProductSearchModel.prototype.getCategory = function getCategory() {
    return this.object.getCategory();
}

ProductSearchModel.prototype.getRefinements = function getRefinements() {
    return this.object.getRefinements();
}

ProductSearchModel.prototype.isRefinedByCategory = function isRefinedByCategory() {
    return this.object.isRefinedByCategory();
}

ProductSearchModel.prototype.canRelax = function canRelax() {
    return this.object.canRelax();
}

ProductSearchModel.prototype.urlRelaxCategory = function urlRelaxCategory() {
    return this.object.urlRelaxCategory();
}

ProductSearchModel.prototype.urlRefineCategory = function urlRefineCategory() {
    return this.object.urlRefineCategory.apply(this.object, arguments);
}

ProductSearchModel.prototype.isRefinedByPriceRange = function isRefinedByPriceRange() {
    return this.object.isRefinedByPriceRange.apply(this.object, arguments);
}

ProductSearchModel.prototype.urlRelaxPrice = function urlRelaxPrice() {
    return this.object.urlRelaxPrice.apply(this.object, arguments);
}

ProductSearchModel.prototype.urlRefinePrice = function urlRefinePrice() {
    return this.object.urlRefinePrice.apply(this.object, arguments);
}

ProductSearchModel.prototype.urlRefinePromotion = function urlRefinePromotion() {
    return this.object.urlRefinePromotion.apply(this.object, arguments);
}

ProductSearchModel.prototype.isRefinedByAttributeValue = function isRefinedByAttributeValue() {
    return this.object.isRefinedByAttributeValue.apply(this.object, arguments);
}

ProductSearchModel.prototype.urlRelaxAttributeValue = function urlRelaxAttributeValue() {
    return this.object.urlRelaxAttributeValue.apply(this.object, arguments);
}

ProductSearchModel.prototype.urlRefineAttributeValue = function urlRefineAttributeValue() {
    return this.object.urlRefineAttributeValue.apply(this.object, arguments);
}


ProductSearchModel.prototype.getRepresentedVariationValues = function getRepresentedVariationValues(arg) {
    const argKey = arg.toString();
    if (!this.representedVariationValuesAccessCache[argKey]) {
        this.representedVariationValuesAccessCache[argKey] = [];
        if (this.object.count <= this.pageSize) {
            let colors = [];
            let colorValues = [];

            var foundProducts = this.foundProducts;
            for (var i = 0; i < foundProducts.length; i++) {
                var hit = foundProducts[i];
                var representedVariationValues = hit.getRepresentedVariationValues(arg);
                for (var j = 0; j < representedVariationValues.length; j++) {
                    var color = representedVariationValues[j]
                    if (colorValues.indexOf(color.value) === -1) {
                        colorValues.push(color.value);
                        colors.push(color);
                    }
                }
            }
            this.representedVariationValuesAccessCache[argKey] = colors;

        } else {
            throw new Error('too many colors');
        }

    }
    return this.representedVariationValuesAccessCache[argKey]
}

function removeDuplicates(arr) {
    let unique = [];
    arr.forEach(element => {
        if (!unique.includes(element)) {
            unique.push(element);
        }
    });
    return unique;
}