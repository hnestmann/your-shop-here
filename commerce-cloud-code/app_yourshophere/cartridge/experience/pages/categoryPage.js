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
        return renderComponent (context)
    } catch (e) {
        const Logger = require('model').get('logger');
        Logger.error(`Exception on rendering page designer component: ${e.message} at '${e.fileName}:${e.lineNumber}'`)
    }
}

function renderComponent (context) {
    var model = new HashMap();
    var page = context.page;
    model.page = page;

    // automatically register configured regions
    var metaDefinition = require('*/cartridge/experience/pages/categoryPage.json');
    model.regions = new RegionModelRegistry(page, metaDefinition);

    model.httpParameter = {};

    if (PageRenderHelper.isInEditMode()) {
        var HookManager = require('dw/system/HookMgr');
        HookManager.callHook('app.experience.editmode', 'editmode');
        model.httpParameter = {
            cgid: context.content && context.content.category && context.content.category.ID
        }
        model.resetEditPDMode = true;
    }
    
    if (context.renderParameters) {
        var queryString = JSON.parse(context.renderParameters).queryString; 
        model.httpParameter = queryString ? JSON.parse('{"' + queryString.replace(/&/g, '","').replace(/=/g,'":"') + '"}', function(key, value) { return key===""?value:decodeURIComponent(value) }) : [];
    }

    const ProductSearchModel = require('dw/catalog/ProductSearchModel');
    const searchModel = new ProductSearchModel();
    searchModel.setCategoryID(model.httpParameter.cgid)
    request.pageMetaData.addPageMetaTags(searchModel.pageMetaTags);

    // Determine seo meta data.
    // Used in htmlHead.isml via common/layout/page.isml decorator.
    model.CurrentPageMetaData = PageRenderHelper.getPageMetaData(page);

    request.custom.model = model;
    // render the page
    return new Template('experience/pages/pdpage').render(model).text;
};
