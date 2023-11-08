'use strict';

/**
 * @namespace Home
 */
const server = require('server');
const models = require('model');
const cache = require('*/cartridge/middleware/cache');
/* @todo include only? */
server.get('Show', cache.applyPromotionSensitiveCache, (req, res, next) => {
    var tileSearch = models.get('search').init({productId: request.httpParameterMap.pid.stringValue, mergeResult: true});
    tileSearch.search();
    res.renderComponent('product/tile', tileSearch.foundProducts.pop());
    next();
});

module.exports = server.exports();
