'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');

/**
 * Component which renders a search box - ideally used in the sfra page header
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
    const model = new HashMap();
    const content = context.content;

    model.placeholderText = content.placeholderText || 'Search';
    model.accesssibilityLabel = content.accesssibilityLabel || 'Enter keyword or Item No';
    return new Template('experience/components/decorator/searchbox').render(model).text;
};
