'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var SVG = require('*/cartridge/scripts/theming/svg.js');

/**
 * Component which renders minicart
 * @param {dw.experience.PageScriptContext} context The page script context object.
 *
 * @returns {string} The template text
 */
module.exports.render = function (context) {
    var model = new HashMap();
    model.content = context.content;
    var content = context.content;

    if (content.icon) {
        if (content.icon) {
            var iconInfo = SVG.getInlinableContent(content.icon.file);
            model.type = iconInfo.type;
            model.content = iconInfo.content;
        }
    }

    return new Template('experience/components/decorator/minicart').render(model).text;
};
