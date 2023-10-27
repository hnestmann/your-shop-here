'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var PageRenderHelper = require('*/cartridge/experience/utilities/PageRenderHelper.js');

/**
 * Render logic for the storefront.2 Row x 1 Col (Mobile) 1 Row x 2 Col (Desktop) layout
 * @param {dw.experience.ComponentScriptContext} context The Component script context object.
 * @param {dw.util.Map} [modelIn] Additional model values created by another cartridge. This will not be passed in by Commcerce Cloud Plattform.
 *
 * @returns {string} The markup to be displayed
 */
module.exports.render = function (context, modelIn) {
    var model = modelIn || new HashMap();
    var component = context.component;
    var content = context.content;

    model.regions = PageRenderHelper.getRegionModelRegistry(component);

    model.noGutters = content.noGutters === 'True';

    model.addStyleClassName = content.addStyleClassName;

    model.column1 = content.column1;
    // is better manage there the 2 columns sub regions
    model.column2 = 12 - Number(content.column1);

    return new Template('experience/components/commerce_layouts/mobileGrid2r1c').render(model).text;
};
