'use strict';

/**
 * Renders the given component
 * 
 * TODO Move this to a helper module
 * 
 * @param {String} id ID of the component (i.e. 'product/name')
 * @returns 
 */
const render = (id) => {return (tileProduct) => {
    const cmp = require(`*/cartridge/components/${id}`);
    response.getWriter().print(cmp.template(cmp.createModel(tileProduct)));
    return '';
}}

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
    res.render('/components/plp/tile', {tileProduct: tileSearch.foundProducts.pop(),components: {
        name: render('product/name'),
        price: render('product/price'),
        image: render('product/image')
    }});
    next();
});

module.exports = server.exports();
