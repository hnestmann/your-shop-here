'use strict';

/**
 * @namespace Home
 */

var server = require('server');
var cache = require('*/cartridge/middleware/cache');
var pageMetaData = require('*/cartridge/middleware/pageMetaData');

/**
 * Any customization on this endpoint, also requires update for Default-Start endpoint
 */
/**
 * Home-Show : This endpoint is called when a shopper navigates to the home page
 * @name Base/Home-Show
 * @function
 * @memberof Home
 * @param {middleware} - consentTracking.consent
 * @param {middleware} - cache.applyDefaultCache
 * @param {category} - non-sensitive
 * @param {renders} - isml
 * @param {serverfunction} - get
 */
server.get('Show', cache.applyDefaultCache, (req, res, next) => {
    const Site = require('dw/system/Site');
    const PageMgr = require('dw/experience/PageMgr');
    const Logger = require('dw/system/Logger');
    pageMetaData.setPageMetaTags(req.pageMetaData, Site.current);

    var page = PageMgr.getPage('homepage');

    if (page && page.isVisible()) {
        res.page('homepage');
    } else {
        Logger.error('page "homepage" not found')
        res.render('pages/notfound', {reason: 'page "homepage" not found'});
    }
    next();
}, pageMetaData.computedPageMetaData);

server.get('ErrorNotFound', function (req, res, next) {
    res.setStatusCode(404);
    res.render('pages/notfound', {reason: '404'});
    next();
});

module.exports = server.exports();