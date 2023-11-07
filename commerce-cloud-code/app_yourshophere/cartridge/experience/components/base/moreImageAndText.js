

'use strict';

const Template = require('dw/util/Template');
const HashMap = require('dw/util/HashMap');
const imageContainerDecorator = require('*/cartridge/experience/utilities/decorator/imageContainer.js');

/**
 * Render logic for storefront.imageAndText component.
 * @param {dw.experience.ComponentScriptContext} context The Component script context object.
 * @returns {string} The template to be displayed
 */
module.exports.render = function (context) {
    const content = context.content;
    const tmpModel = Object.create(null);
    imageContainerDecorator(tmpModel, content);
    const model = tmpModel.imageContainer;
    model.heading = model.heading.replace('<p>','');
    model.heading = model.heading.replace(new RegExp('</p>$'),'');
    const hxdebug = model.link.includes('?');
    model.hxlink = `${model.link}${(model.link.includes('?') ? '&' : '?')}hx=main`;
    return new Template('experience/components/base/moreImageAndText').render(model).text;
};
