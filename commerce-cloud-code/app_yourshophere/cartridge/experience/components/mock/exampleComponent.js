'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');

/**
 * Render logic for storefront.imageAndText component.
 * @param {dw.experience.ComponentScriptContext} context The Component script context object.
 * @returns {string} The template to be displayed
 */
module.exports.render = function (context) {
    var model = new HashMap();
    var content = context.content;

    model.image = content.image.file.url;
    model.text = content.text;

    return new Template('experience/components/exampleComponent').render(model).text;
};

module.exports.serialize = function (context) {
    return { imageUrl: context.content.image.file.url.toString() };
};
