'use strict';

/**
 * @namespace Home
 */
const server = require('server');
const models = require('model');
var cache = require('*/cartridge/middleware/cache');
/* @todo include only? */
server.get('Show', cache.applyPromotionSensitiveCache, (req, res, next) => {
    var tileSearch = models.get('search').init({productId: request.httpParameterMap.pid.stringValue, mergeResult: true});
    tileSearch.search();
    res.render('/components/plp/tile', {tileProduct: tileSearch.foundProducts.pop()});
    next();
});

module.exports = server.exports();