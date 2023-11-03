
function SearchHit(hit) {
    const wrapper = require('*/cartridge/models/wrapper.js');
    wrapper('ProductSearchHit', this, hit);

    Object.defineProperty(this, 'url', {
        get: function () {
            var URLUtils = require('dw/web/URLUtils');

            var url = URLUtils.url('Tile-Show');
            var colorValue;
            var colorIterator;
            var maxPrice;
            var minPrice;
            /* @todo check if we can make something more generic then yshColor */
            colorValue = this.object.firstRepresentedProduct.custom.yshColor ? this.object.firstRepresentedProduct.custom.yshColor : '';
            colorIterator = this.object.getRepresentedVariationValues('yshColor').iterator();

            url.append('pid', this.object.productID);
            url.append('color', colorValue);
            url.append('lastModified', this.object.product.lastModified.getTime());

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
            var colorHash = 0;

            if (colorIterator) {
                var attrValue;

                while (colorIterator.hasNext()) {
                    attrValue = colorIterator.next();
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
            url.append('colorHash', colorHash.toString());

            return url;
        }
    });
}

exports.modelClass = SearchHit;
exports.init = function (hit) {
    return new SearchHit(hit);
};