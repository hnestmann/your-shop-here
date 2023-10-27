'use strict';

var Template = require('dw/util/Template');

/**
 * Component which renders page wide announcements. Optimized to be shown in SFRA header
 * @param {dw.experience.PageScriptContext} context The page script context object.
 *
 * @returns {string} The template text
 */
module.exports.render = function (context) {
    var content = context.content;
    return new Template('experience/components/decorator/announcement').render(content).text;
};
