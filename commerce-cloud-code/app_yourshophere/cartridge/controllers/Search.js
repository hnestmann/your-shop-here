'use strict';

/**
 * @namespace Home
 */
const server = require('server');
const models = require('model');

const Site = require('dw/system/Site');
const PageMgr = require('dw/experience/PageMgr');
const CatalogMgr = require('dw/catalog/CatalogMgr');
const Logger = require('dw/system/Logger');
const HashMap = require('dw/util/HashMap');

const cache = require('*/cartridge/middleware/cache');
const pageMetaData = require('*/cartridge/middleware/pageMetaData');


server.get('Show', cache.applyDefaultCache, (req, res, next) => {
    pageMetaData.setPageMetaTags(req.pageMetaData, Site.current);
    const categoryID = request.httpParameterMap.cgid.submitted ? request.httpParameterMap.cgid.stringValue : 'root';
    const category = CatalogMgr.getCategory(categoryID);
    if (!category) {
        let error = `no category ${categoryID} not found`;
        Logger.error(error);
        res.render('pages/notfound', {reason: error});
        return next();
    }

    const page = PageMgr.getPageByCategory(category, true, 'category');

    if (page && page.isVisible()) {
        const aspectAttributes = new HashMap();
        aspectAttributes.category = category;

        response.writer.print(PageMgr.renderPage(page.ID, aspectAttributes, JSON.stringify({queryString: request.httpQueryString})));
        return;

        //res.page(page,{}, aspectAttributes);
    } else {
        let error = `no page for category ${categoryID} not found`;
        Logger.error(error);
        res.render('pages/notfound', {reason: error});
    }
    next();
}, pageMetaData.computedPageMetaData);


server.get('Grid', server.middleware.include, (req, res, next) => {
    
    var search = models.get('search').init(request.httpParameterMap);
    search.search();
    res.render('/components/plp/grid', {showPagination: request.httpParameterMap.pagination.booleanValue, search: search});
    next();
});

module.exports = server.exports();
