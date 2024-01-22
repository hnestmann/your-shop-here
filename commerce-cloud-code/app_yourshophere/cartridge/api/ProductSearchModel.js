function ProductSearchModel(httpParams, config) {
    const ApiProductSearchModel = require('dw/catalog/ProductSearchModel');

    const instance = new ApiProductSearchModel();
    this.pagePosition = 0;
    this.pageSize = 24;
    this.swatchAttribute = 'yshColor';
    if (config && config.swatchAttribute) {
        this.swatchAttribute = config.swatchAttribute;
    }

    this.representedVariationValuesAccessCache = {};

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
        instance.setPriceMin(Number(minPrice));
    }

    const maxPrice = httpParams.get('pmax');
    if (maxPrice) {
        instance.setPriceMax(Number(maxPrice));
    }

    const promotionId = httpParams.get('pmid');
    if (promotionId) {
        instance.setPromotionID(promotionId);
    }

    const query = httpParams.get('q');
    if (query) {
        instance.setSearchPhrase(query);
    }

    const startParam = httpParams.get('start');
    if (startParam) {
        this.pagePosition = Number(startParam);
    }

    const sizeParam = httpParams.get('sz');
    if (sizeParam) {
        this.pageSize = Number(sizeParam);
    }

    if (request.httpQueryString.includes('pref')) {
        httpParams.forEach((value, key) => {
            if (key.includes('prefn')) {
                instance.addRefinementValues(key, httpParams.get(key.replace('prefn', 'prefv')));
            }
        });
    }

    Object.defineProperty(this, 'foundProducts', {
        get: function initSearchHits() {
            if (!this._viewResults) {
                const ProductSearchHit = require('api/ProductSearchHit');
                const PagingModel = require('dw/web/PagingModel');

                this.pagingModel = new PagingModel(this.object.productSearchHits, this.object.count);
                this.pagingModel.setStart(this.pagePosition);
                this.pagingModel.setPageSize(this.pageSize);

                this._viewResults = this.pagingModel.pageElements.asList().toArray().map((hit) => ProductSearchHit.get(hit, { swatchAttribute: this.swatchAttribute }));
            }
            return this._viewResults;
        },
    });

    Object.defineProperty(this, 'minPrice', {
        get: function getMinPrice() {
            if (!this._minPrice) {
                if (this.object.count <= this.pageSize) {
                    const minPrices = this.foundProducts.map((hit) => hit.minPrice.value);
                    this._minPrice = Math.min.apply(Math, minPrices);
                } else {
                    throw new Error('too many colors');
                }
            }
            return this._minPrice;
        },
    });

    Object.defineProperty(this, 'maxPrice', {
        get: function getMaxPrice() {
            if (!this._maxPrice) {
                if (this.object.count <= this.pageSize) {
                    const maxPrices = this.foundProducts.map((hit) => hit.maxPrice.value);
                    this._maxPrice = Math.max.apply(Math, maxPrices);
                } else {
                    throw new Error('too many colors');
                }
            }
            return this._maxPrice;
        },
    });

    Object.defineProperty(this, 'resultCount', {
        get: function getMaxPrice() {
            return this.object.count;
        },
    });

    this.object = instance;
}

ProductSearchModel.prototype.nextPageUrl = function nextPageUrl(action) {
    let url = this.object.url(action);
    url = this.pagingModel.appendPaging(url, this.pagePosition + this.pageSize);
    return url;
};

ProductSearchModel.prototype.search = function search() {
    return this.object.search();
};

ProductSearchModel.prototype.getCategory = function getCategory() {
    return this.object.getCategory();
};

ProductSearchModel.prototype.getRefinements = function getRefinements() {
    return this.object.getRefinements();
};

ProductSearchModel.prototype.isRefinedByCategory = function isRefinedByCategory() {
    return this.object.isRefinedByCategory();
};

ProductSearchModel.prototype.canRelax = function canRelax() {
    return this.object.canRelax();
};

ProductSearchModel.prototype.urlRelaxCategory = function urlRelaxCategory() {
    return this.object.urlRelaxCategory();
};

ProductSearchModel.prototype.urlRefineCategory = function urlRefineCategory() {
    return this.object.urlRefineCategory.apply(this.object, arguments);
};

ProductSearchModel.prototype.isRefinedByPriceRange = function isRefinedByPriceRange() {
    return this.object.isRefinedByPriceRange.apply(this.object, arguments);
};

ProductSearchModel.prototype.urlRelaxPrice = function urlRelaxPrice() {
    return this.object.urlRelaxPrice.apply(this.object, arguments);
};

ProductSearchModel.prototype.urlRefinePrice = function urlRefinePrice() {
    return this.object.urlRefinePrice.apply(this.object, arguments);
};

ProductSearchModel.prototype.urlRefinePromotion = function urlRefinePromotion() {
    return this.object.urlRefinePromotion.apply(this.object, arguments);
};

ProductSearchModel.prototype.isRefinedByAttributeValue = function isRefinedByAttributeValue() {
    return this.object.isRefinedByAttributeValue.apply(this.object, arguments);
};

ProductSearchModel.prototype.urlRelaxAttributeValue = function urlRelaxAttributeValue() {
    return this.object.urlRelaxAttributeValue.apply(this.object, arguments);
};

ProductSearchModel.prototype.urlRefineAttributeValue = function urlRefineAttributeValue() {
    return this.object.urlRefineAttributeValue.apply(this.object, arguments);
};

ProductSearchModel.prototype.getRepresentedVariationValues = function getRepresentedVariationValues(arg) {
    const argKey = arg.toString();
    if (!this.representedVariationValuesAccessCache[argKey]) {
        this.representedVariationValuesAccessCache[argKey] = [];
        if (this.object.count <= this.pageSize) {
            const HashSet = require('dw/util/HashSet');
            const colors = new HashSet();
            this.foundProducts.forEach((hit) => colors.add(hit.getRepresentedVariationValues(arg)));
            this.representedVariationValuesAccessCache[argKey] = colors.toArray();
        } else {
            throw new Error('too many colors');
        }
    }
    return this.representedVariationValuesAccessCache[argKey];
};

exports.get = function initProductSearchModel(httpParams, config) {
    return new ProductSearchModel(httpParams, config);
};
