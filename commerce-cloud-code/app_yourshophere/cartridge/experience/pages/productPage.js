'use strict';
var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var PageRenderHelper = require('*/cartridge/experience/utilities/PageRenderHelper.js');
var RegionModelRegistry = require('*/cartridge/experience/utilities/RegionModelRegistry.js');

/**
 * Render logic for the storepage.
 *
 * @param {dw.experience.PageScriptContext} context The page script context object.
 *
 * @returns {string} The template text
 */
exports.render = function render (context) {
    try {
        return renderComponent(context);
    } catch (e) {
        const Logger = require('api/Logger');
        Logger.error(`Exception on rendering page designer component: ${e.message} at '${e.fileName}:${e.lineNumber}'`)
    }
}

function renderComponent (context) {
    var model = new HashMap();
    var page = context.page;
    model.page = page;

    model.product = context.content.product;

    if (model.product === 'undefined') {
        return 'Product not found';
    }

    // automatically register configured regions
    var metaDefinition = require('*/cartridge/experience/pages/productPage.json');
    model.regions = new RegionModelRegistry(page, metaDefinition);

    // Determine seo meta data.
    // Used in htmlHead.isml via common/layout/page.isml decorator.
    model.CurrentPageMetaData = PageRenderHelper.getPageMetaData(page);
    model.CurrentPageMetaData = {};
    model.CurrentPageMetaData.title = page.pageTitle;
    model.CurrentPageMetaData.description = page.pageDescription;
    model.CurrentPageMetaData.keywords = page.pageKeywords;

    if (PageRenderHelper.isInEditMode()) {
        var HookManager = require('dw/system/HookMgr');
        HookManager.callHook('app.experience.editmode', 'editmode');
        model.resetEditPDMode = true;
    }
    
    model.httpParameter = {};

    if (context.renderParameters) {
        var queryString = JSON.parse(context.renderParameters).queryString; 
        model.httpParameter = JSON.parse('{"' + queryString.replace(/&/g, '","').replace(/=/g,'":"') + '"}', function(key, value) { return key===""?value:decodeURIComponent(value) })
    }
    request.custom.model = model;
    // render the page

    return new Template('experience/pages/pdpage').render(model).text;
};
