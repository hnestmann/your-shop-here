const CacheMgr = require('dw/system/CacheMgr');
const productCache = CacheMgr.getCache('Product');

exports.get = function get(hit, config) {
    const swatchAttribute = config.swatchAttribute;
    let instance = new ProductSearchHit(hit);

    Object.defineProperty(instance, 'tileUrl', {
        get: function getTileUrl() {
            const hit = this.object;
            const URLUtils = require('dw/web/URLUtils');
            const url = URLUtils.url('Tile-Show');
            let colorValue;
            let colorIterator;
            let maxPrice;
            let minPrice;

            let productGroup = this.object.product;
            colorIterator = this.object.getRepresentedVariationValues(swatchAttribute).iterator();

            url.append('pid', this.mainProductId);
            url.append('lastModified', productGroup.lastModified.getTime());

            maxPrice = this.object.getMaxPrice();
            minPrice = this.object.getMinPrice();

            if (maxPrice && maxPrice.isAvailable()) {
                url.append('maxPrice', maxPrice.getValue());
            }
            if (minPrice && minPrice.isAvailable()) {
                url.append('minPrice', minPrice.getValue());
            }

            // the colorHash is a means to inform the product tile about of stock colors
            // the hitTile knows which colors are in stock hence we "hash" them
            // and add them to the tile url to force a new tile vs the cached tile
            var calculateColorHash = function calculateColorHash() {
                if (colorIterator) {
                    var attrValue;
    
                    while (colorIterator.hasNext()) {
                        attrValue = colorIterator.next();
                        colorValue = colorValue || attrValue.value;
                        // eslint-disable-next-line no-restricted-globals
                        let attrNumber = '';
                        if (isNaN(attrValue.value)) {
                            attrNumber = attrValue.value.split('').map(char => char.charCodeAt(0)).join(0)
                        } else {
                            attrNumber = attrValue.value;
                        }
                        colorHash += parseInt(attrNumber, 10);
                    }
                }
            }
            calculateColorHash();
            var colorHash = 0;

            
            url.append('colorHash', colorHash.toString());
            url.append('color', colorValue);

            return url;
        }, 
        configurable: true
    });

    Object.defineProperty(instance, 'name', {
        get: function () {
            return productCache.get(`name_${this.mainProductId}_${request.locale}`, () => {
                return this.mainProduct.name;
            }); 
        }
    });

    Object.defineProperty(instance, 'productId', {
        get: function () {
            return this.object.productID;
        }
    });

    Object.defineProperty(instance, 'product', {
        get: function () {
            return this.object.product;
        }
    });

    Object.defineProperty(instance, 'minPrice', {
        get: function () {
            return this.object.minPrice;
        }
    });

    Object.defineProperty(instance, 'maxPrice', {
        get: function () {
            return this.object.maxPrice;
        }
    });

    Object.defineProperty(instance, 'mainProduct', {
        get: function () {
            var ProductMgr = require('dw/catalog/ProductMgr');
            return ProductMgr.getProduct(this.mainProductId);
        }
    });

    // @todo make sure name fits with products sets etc
    Object.defineProperty(instance, 'mainProductId', {
        get: function () {
            var hit = this.object;
            if (this.object.hitType === 'variation_group' || (this.object.hitType === 'product' && this.object.productID === this.object.firstRepresentedProductID)) {
                return productCache.get(`relation_to_main_${this.object.productID}`, () => {
                    return (this.object.product.variant || this.object.product.variationGroup) ? this.object.product.masterProduct.ID : this.object.product.ID;
                }); 
            }

            return this.object.productID;
        }
    });

    return instance;
}

function ProductSearchHit(hit) {
    this.object = hit;
    this.representedVariationValuesAccessCache = {}
}

ProductSearchHit.prototype.getRepresentedVariationValues = function getRepresentedVariationValues(object) {
    if (!this.representedVariationValuesAccessCache[object.toString()]) {
        this.representedVariationValuesAccessCache[object.toString()] = this.object.getRepresentedVariationValues(object).toArray()
    }
    return this.representedVariationValuesAccessCache[object.toString()];
}