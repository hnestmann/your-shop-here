'use strict';

/**
 * @namespace Home
 */
const server = require('server');

const PageMgr = require('dw/experience/PageMgr');
const CatalogMgr = require('dw/catalog/CatalogMgr');
const Logger = require('api/Logger');
const HashMap = require('dw/util/HashMap');

const cache = require('*/cartridge/middleware/cache');

server.get('Show', cache.applyDefaultCache, (req, res, next) => {
    const categoryId = request.httpParameterMap.cgid.submitted ? request.httpParameterMap.cgid.stringValue : 'root';
    const category = CatalogMgr.getCategory(categoryId);
    if (!category) {
        const noCategoryError = `no category ${categoryId} not found`;
        Logger.error(noCategoryError);
        res.render('pages/notfound', { reason: noCategoryError });
        return next();
    }

    const page = PageMgr.getPageByCategory(category, true, 'category');

    if (page && page.isVisible()) {
        const aspectAttributes = new HashMap();
        aspectAttributes.category = category;

        const HttpSearchParams = require('api/URLSearchParams');
        const searchParams = (new HttpSearchParams(request.httpParameterMap)).allowList(require('api/ProductSearchModel').constants.urlAllowListAll);
        searchParams.sort();
        const queryString = searchParams.toString();

        res.page(page.ID, JSON.stringify({ queryString }), aspectAttributes);
    } else {
        const error = `no page for category ${categoryId} not found`;
        Logger.error(error);
        res.render('pages/notfound', { reason: error });
    }
    return next();
});

server.get('Grid', cache.applyInventorySensitiveCache, (req, res, next) => {
    res.renderPartial('plp/grid');
    next();
});


server.get('Refinements', cache.applyDefaultCache, (req, res, next) => {
    res.renderPartial('plp/refinements');
    next();
});

module.exports = server.exports();
