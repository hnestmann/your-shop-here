'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var PageRenderHelper = require('*/cartridge/experience/utilities/PageRenderHelper.js');

/**
 * A top level menu item 
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
    var content = context.content;
    var component = context.component;

    var model = new HashMap();
    model.regions = PageRenderHelper.getRegionModelRegistry(component);
    model.content = content;
    return new Template('experience/components/decorator/menuitem').render(model).text;
};
