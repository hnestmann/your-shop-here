'use strict';

var Template = require('dw/util/Template');

/**
 * Render logic for storefront.carousel layout.
 * @param {dw.experience.ComponentScriptContext} context The component script context object.
 * @returns {string} The template to be displayed
 */
module.exports.render = function (context) {
    var content = context.content;
    return new Template('experience/components/more_pd/divider').render(content).text;
};
