'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');

/**
 * Component which renders the classic SFRA menu
 * @param {dw.experience.PageScriptContext} context The page script context object.
 *
 * @returns {string} The template text
 */
module.exports.render = function (context) {
    var model = new HashMap();
    var content = context.content;
    if (content.align) {
        model.align = content.align;
    }
    if (content.applyFilter) {
        model.applyFilter = content.applyFilter;
    } else {
        model.applyFilter = false;
    }

    return new Template('experience/components/decorator/categorymenu').render(model).text;
};
