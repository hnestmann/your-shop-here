'use strict';

var ISML = require('dw/template/ISML');
var PageRenderHelper = require('*/cartridge/experience/utilities/PageRenderHelper.js');
var RegionModelRegistry = require('*/cartridge/experience/utilities/RegionModelRegistry.js');
var HashMap = require('dw/util/HashMap');
/**
 * Render logic for the pdp page.
 *
 * @param {dw.experience.PageScriptContext} context The page script context object.
 *
 */
module.exports.render = function (context) {

    var model = {};

    var productHelper = require('*/cartridge/scripts/helpers/productHelpers.js');
    var pageMetaHelper = require('*/cartridge/scripts/helpers/pageMetaHelper');

    var page = context.page;

    var content = context.content;

    if (content.product) {
        var params = { pid: content.product.ID };
        
        var product = context.content.product;

        var params = { pid: product.ID };
        var showProductPageHelperResult = productHelper.showProductPage(params, request.pageMetaData);

        pageMetaHelper.setPageMetaData(request.pageMetaData, product);
        pageMetaHelper.setPageMetaTags(request.pageMetaData, product);

        var metaDefinition = require('*/cartridge/experience/pages/productPage.json');
    
        // this is exactly the SFRA model plus the regions
        model = {
            page: page,
            product: showProductPageHelperResult.product,
            addToCartUrl: showProductPageHelperResult.addToCartUrl,
            resources: showProductPageHelperResult.resources,
            breadcrumbs: showProductPageHelperResult.breadcrumbs,
            canonicalUrl: showProductPageHelperResult.canonicalUrl,
            schemaData: showProductPageHelperResult.schemaData,
            regions: new RegionModelRegistry(context.page, metaDefinition)
        };
    }

    model.CurrentPageMetaData = PageRenderHelper.getPageMetaData(context.page);

    var modelAsHashMap = new HashMap();

    Object.keys(model).forEach(function (key) {
        modelAsHashMap[key] = model[key];
    });

    request.custom.model = modelAsHashMap; // eslint-disable-line no-undef

    if (PageRenderHelper.isInEditMode()) {
        var HookManager = require('dw/system/HookMgr');
        HookManager.callHook('app.experience.editmode', 'editmode');
        model.resetEditPDMode = true;
    }

    response.setExpires(new Date().getTime() + (24 * 60 * 60 * 1000)); // eslint-disable-line no-undef
    response.setVaryBy('price_promotion'); // eslint-disable-line no-undef

    // render the page
    ISML.renderTemplate('experience/pages/productPage', model);
};
