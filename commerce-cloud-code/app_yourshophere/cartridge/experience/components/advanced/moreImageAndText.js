'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var imageContainerDecorator = require('*/cartridge/experience/utilities/decorator/imageContainer.js');


/**
 * Render logic for storefront.imageAndText component.
 * @param {dw.experience.ComponentScriptContext} context The Component script context object.
 * @returns {string} The template to be displayed
 */
module.exports.render = function (context) {
    var model = new HashMap();
    var content = context.content;
    var tmpModel = Object.create(null);
    imageContainerDecorator(tmpModel, content);
    model = tmpModel.imageContainer;
    return new Template('experience/components/more_pd/moreImageAndText').render(model).text;
};
