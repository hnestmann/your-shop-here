'use strict';
var Template = require('/dw/util/Template');
var HashMap = require('/dw/util/HashMap');
var PageRenderHelper = require('*/cartridge/experience/utilities/PageRenderHelper.js');
var RegionModelRegistry = require('*/cartridge/experience/utilities/RegionModelRegistry.js');

/**
 * Render logic for the theme page, which can be partially included oon the rest of the website
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
        Logger.error('Exception on rendering page designer component: ' + e);
    }
}

function renderComponent (context) {
    var model = new HashMap();
    var page = context.page;

    model.page = page;

    // automatically register configured regions
    var metaDefinition = require('*/cartridge/experience/pages/theme.json');
    model.regions = new RegionModelRegistry(page, metaDefinition);

    // Determine seo meta data.
    // Used in htmlHead.isml via common/layout/page.isml decorator.
    // model.CurrentPageMetaData = context.pageMetaData;

    if (PageRenderHelper.isInEditMode()) {
        var HookManager = require('dw/system/HookMgr');
        HookManager.callHook('app.experience.editmode', 'editmode');
        model.resetEditPDMode = true;
        model.isInEditMode = true;
    } else {
        var parameters = JSON.parse(context.renderParameters);
        model.isInEditMode = false;
        for (var name in parameters) {
            model[name] = parameters[name];
        }
    }
    model.CurrentPageMetaData = {};
    // render the page
    return new Template('decorator/pdtheme').render(model).text;
};
