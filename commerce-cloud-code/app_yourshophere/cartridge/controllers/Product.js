/**
 * @namespace Home
 */
const server = require('server');

const Site = require('dw/system/Site');
const PageMgr = require('dw/experience/PageMgr');
const ProductMgr = require('dw/catalog/ProductMgr');
const Logger = require('api/Logger');
const HashMap = require('dw/util/HashMap');

const cache = require('*/cartridge/middleware/cache');
const pageMetaData = require('*/cartridge/middleware/pageMetaData');

server.get('Show', cache.applyDefaultCache, (req, res, next) => {
    pageMetaData.setPageMetaTags(req.pageMetaData, Site.current);
    const productId = request.httpParameterMap.pid.submitted ? request.httpParameterMap.pid.stringValue : null;
    const product = productId && ProductMgr.getProduct(productId);

    if (!product || !product.online) {
        let error = `no product ${productId} not found`;
        Logger.error(error);
        res.render('pages/notfound', { reason: error });
        return next();
    }

    let page = PageMgr.getPageByProduct(product, true, 'product');
    const master = product.variant ? product.masterProduct : product;
    if (!(page && page.isVisible())) {
        let category = master.primaryCategory;
        if (!category) {
            category = master.classificationCategory;
        }
        if (!category && master.categories && master.categories.length) {
            category = master.categories[0];
        }
        if (category) {
            page = PageMgr.getPageByCategory(category, true, 'product');
        }
    }

    if (page && page.isVisible()) {
        const aspectAttributes = new HashMap();
        aspectAttributes.product = product;

        const HttpSearchParams = require('api/URLSearchParams');

        // @TODO add PDP allowlist (variation attributes, options, pid)
        const productParams = new HttpSearchParams(request.httpParameterMap);
        productParams.sort();
        const queryString = productParams.toString();

        res.page(page.ID, JSON.stringify({ queryString }), aspectAttributes);
    } else {
        let error = `No page for product ${productId} found`;
        Logger.error(error);
        res.render('pages/notfound', { reason: error });
    }

    next();
}, pageMetaData.computedPageMetaData);

module.exports = server.exports();
