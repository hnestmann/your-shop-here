'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');

/**
 * Component used to include the megamenu virtual page.
 * @param {dw.experience.PageScriptContext} context The page script context object.
 *
 * @returns {string} The template text
 */
module.exports.render = function (context) {
    var model = new HashMap();
    var content = context.content;
    model.content = content;
    model.params = {};

    return new Template('experience/components/decorator/menupageinclude').render(model).text;
};
