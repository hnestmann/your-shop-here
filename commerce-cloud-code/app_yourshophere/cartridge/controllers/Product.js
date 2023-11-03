'use strict';

/**
 * @namespace Home
 */
const server = require('server');
const models = require('model');

const Site = require('dw/system/Site');
const PageMgr = require('dw/experience/PageMgr');
const ProductMgr = require('dw/catalog/ProductMgr');
const Logger = require('dw/system/Logger');
const HashMap = require('dw/util/HashMap');

const cache = require('*/cartridge/middleware/cache');
const pageMetaData = require('*/cartridge/middleware/pageMetaData');


server.get('Show', cache.applyDefaultCache, (req, res, next) => {
    pageMetaData.setPageMetaTags(req.pageMetaData, Site.current);
    const productId = request.httpParameterMap.pid.submitted ? request.httpParameterMap.pid.stringValue : '';
    const product = ProductMgr.getProduct(productId);


    if (!product || !product.online) {
        let error = `no category ${productId} not found`;
        Logger.error(error);
        res.render('pages/notfound', { reason: error });
        return next();
    }

    let page = PageMgr.getPageByProduct(product, true, 'product');
    if (!(page && page.isVisible())) {
        let category = product.primaryCategory;
        if (!category) {
            category = product.classificationCategory;
        }
        if (!category && product.categories) {
            category = product.categories[0];
        }
        if (category) {
            page = PageMgr.getPageByCategory(category, true, 'product');
        }
    }


    if (page && page.isVisible()) {
        const aspectAttributes = new HashMap();
        aspectAttributes.product = product;

        /* @todo put back into render - add allow list of proxied params */
        response.writer.print(PageMgr.renderPage(page.ID, aspectAttributes, JSON.stringify({ queryString: request.httpQueryString })));
        return;

    } else {
        let error = `no page for product ${productId} not found`;
        Logger.error(error);
        res.render('pages/notfound', { reason: error });
    }
    next();
}, pageMetaData.computedPageMetaData);


module.exports = server.exports();
